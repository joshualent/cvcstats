import {
  McgoStats,
  Gun,
  GunStat,
  Mode,
  ModeStat,
  HypixelPlayerAPIResponse,
  CvcStats,
  FullCvcStats,
  ExtraCvcStats,
  GunsStats,
  ModesStats,
  ExtraKey,
} from '../../src/lib/types'

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
): CvcStats {
  const {
    uuid,
    displayname,
    firstLogin,
    lastLogin,
    lastLogout,
    networkExp,
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

export function buildFullCvcStats(
  player: HypixelPlayerAPIResponse['player'],
): CvcStats & { extras: ExtraCvcStats } {
  return {
    ...buildBaseCvcStats(player),

    extras: {
      ...buildExtraCvcStats(player),
    },
  }
}

export const EXTRA_KEYS = [
  'coins',
  'pocket_change',
  'game_wins_temple',
  'game_wins_junction',
  'game_wins_harbor',
  'game_wins_melon factory v2',
  'game_wins_alleyway',
  'game_wins_derailed',
  'game_wins_riviera',
  'handgun_cost_reduction',
  'game_wins_ruins',
  'game_wins_atomic v2',
  'game_wins_overgrown',
  'game_wins_sandstorm',
  'handgun_damage_increase',
  'handgun_recoil_reduction',
  'handgun_reload_speed_reduction',
  'magnum_damage_increase',
  'magnum_recoil_reduction',
  'magnum_reload_speed_reduction',
  'magnum_cost_reduction',
  'rifle_damage_increase',
  'rifle_recoil_reduction',
  'rifle_reload_speed_reduction',
  'rifle_cost_reduction',
  'shotgun_damage_increase',
  'shotgun_recoil_reduction',
  'shotgun_reload_speed_reduction',
  'shotgun_cost_reduction',
  'pistol_damage_increase',
  'pistol_recoil_reduction',
  'pistol_reload_speed_reduction',
  'scoped_rifle_damage_increase',
  'scoped_rifle_recoil_reduction',
  'scoped_rifle_cost_reduction',
  'scoped_rifle_reload_speed_reduction',
  'sniper_damage_increase',
  'sniper_reload_speed_reduction',
  'sniper_cost_reduction',
  'carbine_damage_increase',
  'carbine_recoil_reduction',
  'carbine_reload_speed_reduction',
  'carbine_cost_reduction',
  'strength_training',
  'bounty_hunter',
  'game_wins_bazaar',
  'knife_attack_delay',
  'knife_damage_increase',
  'body_armor_cost',
  'game_wins_castle',
  'game_wins_reserve',
  'bullpup_cost_reduction',
  'auto_shotgun_cost_reduction',
  'bullpup_damage_increase',
  'bullpup_recoil_reduction',
  'bullpup_reload_speed_reduction',
  'auto_shotgun_reload_speed_reduction',
  'auto_shotgun_recoil_reduction',
  'auto_shotgun_damage_increase',
  'smg_damage_increase',
  'smg_cost_reduction',
  'fastest_win_gungame',
  'game_wins_atomic',
  'game_wins_melon factory',
  'smg_recoil_reduction',
  'smg_reload_speed_reduction',
] as const satisfies readonly ExtraKey[]
