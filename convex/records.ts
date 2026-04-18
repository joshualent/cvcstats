import { query, action, internalMutation } from './_generated/server'
import { internal } from './_generated/api'
import { api } from './_generated/api'
import { v } from 'convex/values'

import type { HypixelPlayerAPIResponse } from '../src/lib/types'
import { buildBaseCvcStats, buildFullCvcStats } from './lib/hypixel'
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

export const createRecord = internalMutation({
  args: { ...recordFields, uuid: v.string() },
  handler: async (ctx, args) => ctx.db.insert('records', args),
})

export const getHypixelStats = action({
  args: { username: v.string() },
  handler: async (ctx, args) => {
    let player = await ctx.runAction(api.records.lookupPlayer, {
      username: args.username,
    })

    if (!player?.uuid) {
      return null
    }

    const apiKey = process.env.HYPIXEL_API_KEY
    if (!apiKey) {
      throw new Error("Can't fetch Hypixel statistics at this time")
    }

    const hypixel_response = await fetch(
      `https://api.hypixel.net/v2/player?uuid=${player.uuid}`,
      { headers: { 'API-Key': apiKey } },
    )
    if (!hypixel_response.ok) {
      throw new Error('Unable to fetch player information from Hypixel')
    }
    const hypixel_data: HypixelPlayerAPIResponse = await hypixel_response.json()
    if (!hypixel_data?.player) {
      return null
    }

    if (!hypixel_data.player.stats.MCGO) {
      return null
    }
    // schedule a mutation to save player data to convex
    const stats = buildBaseCvcStats(hypixel_data.player)
    const { uuid, ...rest } = stats

    await ctx.scheduler.runAfter(0, internal.records.createRecord, {
      uuid,
      ...rest,
    })

    return buildFullCvcStats(hypixel_data.player)
  },
})
