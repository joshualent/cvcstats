import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

const gunStat = v.object({
  kills: v.optional(v.number()),
  headshots: v.optional(v.number()),
})
const modeStat = v.object({
  kills: v.optional(v.number()),
  deaths: v.optional(v.number()),
  game_plays: v.optional(v.number()),
  game_wins: v.optional(v.number()),
  cop_kills: v.optional(v.number()),
  criminal_kills: v.optional(v.number()),
  assists: v.optional(v.number()),
})

export const recordFields = {
  firstLogin: v.optional(v.number()),
  lastLogin: v.optional(v.number()),
  lastLogout: v.optional(v.number()),
  networkExp: v.optional(v.number()),
  mostRecentGameType: v.optional(v.string()),
  newPackageRank: v.optional(v.string()),
  rank: v.optional(v.string()),

  kills: v.optional(v.number()),
  deaths: v.optional(v.number()),
  game_plays: v.optional(v.number()),
  game_wins: v.optional(v.number()),
  game_wins_carrier: v.optional(v.number()),
  round_wins: v.optional(v.number()),
  shots_fired: v.optional(v.number()),
  headshot_kills: v.optional(v.number()),
  bombs_defused: v.optional(v.number()),
  bombs_planted: v.optional(v.number()),
  criminal_kills: v.optional(v.number()),
  assists: v.optional(v.number()),
  cop_kills: v.optional(v.number()),
  level: v.optional(v.number()),
  score: v.optional(v.number()),
  knife_kills: v.optional(v.number()),
  grenade_kills: v.optional(v.number()),

  guns: v.object({
    pistol: gunStat,
    magnum: gunStat,
    carbine: gunStat,
    shotgun: gunStat,
    autoShotgun: gunStat,
    scopedRifle: gunStat,
    handgun: gunStat,
    rifle: gunStat,
    smg: gunStat,
    sniper: gunStat,
    bullpup: gunStat,
  }),
  modes: v.object({
    deathmatch: modeStat,
    gungame: modeStat,
  }),
}

export default defineSchema({
  players: defineTable({
    uuid: v.string(),
    username: v.string(),
    displayname: v.string(),
  })
    .index('by_username', ['username'])
    .index('by_uuid', ['uuid']),

  records: defineTable({
    ...recordFields,
    uuid: v.string(),
  }).index('by_uuid', ['uuid']),
})
