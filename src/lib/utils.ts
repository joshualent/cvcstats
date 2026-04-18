import { createServerFn } from '@tanstack/react-start'
import { clsx } from 'clsx'
import type { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import {
  type CvcStats,
  type Gun,
  type GunsStats,
  type GunStat,
  type HypixelPlayerAPIResponse,
  type Mode,
  type ModesStats,
  type ModeStat,
  type MojangProfileAPIResponse,
  type McgoStats,
  type ExtraCvcStats,
  EXTRA_KEYS,
  type FullCvcStats,
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
  .handler(async ({ data }): Promise<CvcStats> => {
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

    if (!hypixel_data.player.stats.MCGO) {
      throw new Error('Cops Vs. Crims stats are not available for this player')
    }

    return buildFullCvcStats(hypixel_data.player)
  })

function buildGunStat(mcgo: McgoStats, name: Gun): GunStat {
  return {
    kills: mcgo[`${name}Kills`] ?? 0,
    headshots: mcgo[`${name}Headshots`] ?? 0,
  }
}

function buildModeStat(mcgo: McgoStats, name: Mode): ModeStat {
  return {
    kills: mcgo[`kills_${name}`] ?? 0,
    deaths: mcgo[`deaths_${name}`] ?? 0,
    game_plays: mcgo[`game_plays_${name}`] ?? 0,
    game_wins: mcgo[`game_wins_${name}`] ?? 0,
    cop_kills: mcgo[`cop_kills_${name}`] ?? 0,
    criminal_kills: mcgo[`criminal_kills_${name}`] ?? 0,
    assists: mcgo[`assists_${name}`] ?? 0,
  }
}

function buildBaseCvcStats(
  player: HypixelPlayerAPIResponse['player'],
): CvcStats {
  const {
    uuid,
    displayname,
    firstLogin,
    lastLogin,
    lastLogout,
    networkExp,
    newPackageRank,
    mostRecentGameType,
    rank,
    stats,
  } = player

  const {
    kills,
    deaths,
    game_plays,
    game_wins,
    game_wins_carrier,
    round_wins,
    shots_fired,
    headshot_kills,
    bombs_defused,
    bombs_planted,
    criminal_kills,
    assists,
    cop_kills,
    level,
    score,
    knife_kills,
    grenade_kills,
  } = stats.MCGO

  const guns: GunsStats = {
    pistol: buildGunStat(stats.MCGO, 'pistol'),
    magnum: buildGunStat(stats.MCGO, 'magnum'),
    carbine: buildGunStat(stats.MCGO, 'carbine'),
    shotgun: buildGunStat(stats.MCGO, 'shotgun'),
    autoShotgun: buildGunStat(stats.MCGO, 'autoShotgun'),
    scopedRifle: buildGunStat(stats.MCGO, 'scopedRifle'),
    handgun: buildGunStat(stats.MCGO, 'handgun'),
    rifle: buildGunStat(stats.MCGO, 'rifle'),
    smg: buildGunStat(stats.MCGO, 'smg'),
    sniper: buildGunStat(stats.MCGO, 'sniper'),
    bullpup: buildGunStat(stats.MCGO, 'bullpup'),
  }

  const modes: ModesStats = {
    deathmatch: buildModeStat(stats.MCGO, 'deathmatch'),
    gungame: buildModeStat(stats.MCGO, 'gungame'),
  }

  return {
    uuid,
    displayname,
    firstLogin,
    lastLogin,
    lastLogout,
    networkExp,
    newPackageRank,
    mostRecentGameType,
    rank,

    kills,
    deaths,
    game_plays,
    game_wins,
    game_wins_carrier,
    round_wins,
    shots_fired,
    headshot_kills,
    bombs_defused,
    bombs_planted,
    criminal_kills,
    assists,
    cop_kills,
    level,
    score,
    knife_kills,
    grenade_kills,
    guns: guns,
    modes: modes,
  }
}

function buildExtraCvcStats(
  player: HypixelPlayerAPIResponse['player'],
): ExtraCvcStats {
  const result: ExtraCvcStats = {}
  for (const key of EXTRA_KEYS) {
    result[key] = player.stats.MCGO[key]
  }
  return result as ExtraCvcStats
}

function buildFullCvcStats(
  player: HypixelPlayerAPIResponse['player'],
): FullCvcStats {
  return {
    ...buildBaseCvcStats(player),

    extras: {
      ...buildExtraCvcStats(player),
    },
  }
}
