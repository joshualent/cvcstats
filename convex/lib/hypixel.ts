import { Doc } from '../_generated/dataModel'
import {
  McgoStats,
  Gun,
  Mode,
  HypixelPlayerAPIResponse,
  BaseCvcStats,
  FullCvcStats,
  EXTRA_KEYS,
  GunStat,
  GunsStats,
  ModeStat,
  ModesStats,
  Extras,
  StatsShape,
} from './types'

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

export function buildBaseCvcStats(
  player: HypixelPlayerAPIResponse['player'],
): BaseCvcStats {
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

export function buildExtraCvcStats(
  player: HypixelPlayerAPIResponse['player'],
): Extras {
  const result: Extras = {}
  for (const key of EXTRA_KEYS) {
    result[key] = player.stats.MCGO[key]
  }
  return result as Extras
}

export function buildFullCvcStats(
  player: HypixelPlayerAPIResponse['player'],
): FullCvcStats {
  return {
    ...buildBaseCvcStats(player),

    extras: buildExtraCvcStats(player),
  }
}

export function fromDoc(doc: Doc<'records'>): StatsShape {
  const { _id, _creationTime, ...base } = doc
  return { ...base, extras: {}, fetchedAt: _creationTime }
}
export function fromApi(
  player: HypixelPlayerAPIResponse['player'],
): StatsShape {
  return {
    ...buildBaseCvcStats(player),
    extras: buildExtraCvcStats(player),
    fetchedAt: Date.now(),
  }
}
