import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  players: defineTable({
    uuid: v.string(),
    username: v.string(),
  }),
  records: defineTable({
    playerId: v.id('players'),
    level: v.number(),
    wins: v.number(),
    loses: v.number(),
    gamesPlayed: v.number(),
  }).index('by_playerId', ['playerId']),
})
