import {
  query,
  action,
  internalMutation,
  internalQuery,
} from './_generated/server'
import { internal } from './_generated/api'
import { api } from './_generated/api'
import { v } from 'convex/values'

import type { HypixelPlayerAPIResponse, Result, StatsShape } from './lib/types'
import { buildBaseCvcStats, fromApi, fromDoc } from './lib/hypixel'
import { recordFields } from './schema'

export const getPlayerByUsername = query({
  args: { username: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('players')
      .withIndex('by_username', (q) => q.eq('username', args.username))
      .first()
  },
})

export const getPlayerAndLatestRecord = query({
  args: { username: v.string() },
  handler: async (ctx, args) => {
    const player = await ctx.db
      .query('players')
      .withIndex('by_username', (q) => q.eq('username', args.username))
      .first()
    if (player === null) return { player: null, record: null }
    const record = await ctx.db
      .query('records')
      .withIndex('by_uuid', (q) => q.eq('uuid', player.uuid))
      .first()
    return { player, record }
  },
})

export const insertPlayer = internalMutation({
  args: { displayname: v.string(), uuid: v.string() },
  handler: async (ctx, args) => {
    const username = args.displayname.toLowerCase()
    return await ctx.db.insert('players', {
      username: username,
      displayname: args.displayname,
      uuid: args.uuid,
    })
  },
})

export const lookupPlayer = action({
  args: { username: v.string() },
  handler: async (
    ctx,
    args,
  ): Promise<{
    username: string
    displayname: string
    uuid: string
  } | null> => {
    const cached = await ctx.runQuery(api.records.getPlayerByUsername, {
      username: args.username,
    })

    if (cached) return cached
    const res = await fetch(
      `https://api.mojang.com/users/profiles/minecraft/${args.username}`,
    )
    if (!res.ok) return null

    const data = await res.json()
    if (!data.name || !data.id) return null

    await ctx.scheduler.runAfter(0, internal.records.insertPlayer, {
      displayname: data.name,
      uuid: data.id,
    })

    return {
      username: args.username,
      displayname: data.name,
      uuid: data.id,
    }
  },
})

export const fetchLatestRecord = internalQuery({
  args: { uuid: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('records')
      .withIndex('by_uuid', (q) => q.eq('uuid', args.uuid))
      .first()
  },
})

export const createRecord = internalMutation({
  args: { ...recordFields },
  handler: async (ctx, args) => ctx.db.insert('records', args),
})

export const getHypixelStats = action({
  args: { username: v.string() },
  handler: async (ctx, args): Promise<Result<StatsShape>> => {
    const player = await ctx.runAction(api.records.lookupPlayer, {
      username: args.username,
    })

    if (!player?.uuid) {
      return {
        ok: false,
        code: 'PLAYER_NOT_FOUND',
      }
    }

    const data = await ctx.runQuery(internal.records.fetchLatestRecord, {
      uuid: player.uuid,
    })
    if (data?._creationTime) {
      return {
        ok: true,
        data: fromDoc(data),
      }
    }

    const apiKey = process.env.HYPIXEL_API_KEY
    if (!apiKey) {
      return {
        ok: false,
        code: 'UPSTREAM_UNAVAILABLE',
      }
    }

    const hypixel_response = await fetch(
      `https://api.hypixel.net/v2/player?uuid=${player.uuid}`,
      { headers: { 'API-Key': apiKey } },
    )
    if (!hypixel_response.ok) {
      return {
        ok: false,
        code: 'UPSTREAM_UNAVAILABLE',
      }
    }
    const hypixel_data: HypixelPlayerAPIResponse = await hypixel_response.json()
    if (!hypixel_data?.player) {
      return {
        ok: false,
        code: 'PLAYER_NOT_FOUND',
      }
    }

    if (!hypixel_data.player.stats.MCGO) {
      return {
        ok: false,
        code: 'NO_CVC_DATA',
      }
    }
    const stats = buildBaseCvcStats(hypixel_data.player)

    await ctx.scheduler.runAfter(0, internal.records.createRecord, {
      ...stats,
    })

    return {
      ok: true,
      data: fromApi(hypixel_data.player),
    }
  },
})
