import { resolve } from 'path'
import { buildFullCvcStats } from '../convex/lib/hypixel'
import type {
  FullCvcStats,
  HypixelPlayerAPIResponse,
  MojangProfileAPIResponse,
} from '../convex/lib/types'
import { loadEnvFile } from 'process'
import { readFile } from 'node:fs/promises'

export async function fetchUUID(username: string) {
  const res = await fetch(
    `https://api.mojang.com/users/profiles/minecraft/${username}`,
  )

  if (!res.ok) return null

  const data: MojangProfileAPIResponse = await res.json()

  if (!data.name || !data.id) return null

  return data.id
}

export async function fetchHypixelStats(uuid: string) {
  loadEnvFile(resolve('.env.local'))

  const apiKey = process.env.HYPIXEL_API_KEY
  if (!apiKey) return null

  const hypixel_response = await fetch(
    `https://api.hypixel.net/v2/player?uuid=${uuid}`,
    { headers: { 'API-Key': apiKey } },
  )
  const hypixel_data: HypixelPlayerAPIResponse = await hypixel_response.json()
  if (hypixel_data.player == null) return null

  return buildFullCvcStats(hypixel_data.player)
}

export async function readStatsFromJson(
  filepath = './scripts/playerData.json',
) {
  const playerData = await readFile(filepath, 'utf-8')
  return playerData
}
