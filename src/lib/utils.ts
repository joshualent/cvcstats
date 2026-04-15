import { createServerFn } from '@tanstack/react-start'
import { clsx } from 'clsx'
import type { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type {
  HypixelPlayerAPIResponse,
  MojangProfileAPIResponse,
  PlayerData,
} from './types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getPlayerUUID = createServerFn({
  method: 'GET',
})
  .inputValidator((data: { username: string }) => data)
  .handler(async ({ data }) => {
    const mojang_response = await fetch(
      `https://api.mojang.com/users/profiles/minecraft/${data.username}`,
    )
    if (!mojang_response.ok) {
      throw new Error(
        'Player lookup failed. Are you sure this username exists?',
      )
    }
    return (await mojang_response.json()) as MojangProfileAPIResponse
  })

export const getHypixelStats = createServerFn({
  method: 'GET',
})
  .inputValidator((data: { uuid: string }) => data)
  .handler(async ({ data }) => {
    const apiKey = process.env.HYPIXEL_API_KEY
    if (!apiKey) {
      throw new Error("Can't fetch Hypixel statistics at this time")
    }

    const hypixel_response = await fetch(
      `https://api.hypixel.net/v2/player?uuid=${data.uuid}`,
      { headers: { 'API-Key': apiKey } },
    )
    if (!hypixel_response.ok) {
      throw new Error('Unable to fetch player information from Hypixel')
    }
    const hypixel_data: HypixelPlayerAPIResponse = await hypixel_response.json()
    if (!hypixel_data?.player) {
      throw new Error('Unable to fetch player information from Hypixel')
    }

    const {
      uuid,
      displayname,
      networkExp,
      firstLogin,
      lastLogin,
      lastLogout,
      mostRecentGameType,
      newPackageRank,
      rank,
      stats,
    } = hypixel_data.player

    if (!stats.MCGO) {
      throw new Error('CVC stats are not available for this player')
    }

    const playerData: PlayerData = {
      uuid,
      displayname,
      networkExp,
      firstLogin,
      lastLogin,
      lastLogout,
      mostRecentGameType,
      newPackageRank,
      rank,
      stats: stats.MCGO,
    }

    return playerData
  })
