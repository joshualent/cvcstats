export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue }

export type MojangProfileAPIResponse = {
  id: string
  name: string
}

export type Gun =
  | 'pistol'
  | 'magnum'
  | 'carbine'
  | 'shotgun'
  | 'autoShotgun'
  | 'scopedRifle'
  | 'handgun'
  | 'rifle'
  | 'smg'
  | 'sniper'
  | 'bullpup'
export type GunKillsKey = `${Gun}Kills`
export type GunHeadshotsKey = `${Gun}Headshots`
export type GunStat = {
  kills: number
  headshots: number
}

export type GunsStats = {
  pistol: GunStat
  magnum: GunStat
  carbine: GunStat
  shotgun: GunStat
  autoShotgun: GunStat
  scopedRifle: GunStat
  handgun: GunStat
  rifle: GunStat
  smg: GunStat
  sniper: GunStat
  bullpup: GunStat
}

export type Mode = 'deathmatch' | 'gungame'
export type ModeKillsKey = `kills_${Mode}`
export type ModeDeathsKey = `deaths_${Mode}`
export type ModeGamePlaysKey = `game_plays_${Mode}`
export type ModeGameWinsKey = `game_wins_${Mode}`
export type ModeCopKillsKey = `cop_kills_${Mode}`
export type ModeCriminalKillsKey = `criminal_kills_${Mode}`
export type ModeAssistsKey = `assists_${Mode}`

export type ModeStat = {
  kills: number
  deaths: number
  game_plays: number
  game_wins: number
  cop_kills: number
  criminal_kills: number
  assists: number
}

export type ModesStats = {
  deathmatch: ModeStat
  gungame: ModeStat
}

export type McgoStats = {
  kills?: number
  deaths?: number
  coins?: number
  game_plays?: number
  game_wins?: number
  game_wins_carrier?: number
  round_wins?: number
  shots_fired?: number
  kills_deathmatch?: number
  deaths_deathmatch?: number
  pistolKills?: number
  pistolHeadshots?: number
  cop_kills_deathmatch?: number
  game_plays_deathmatch?: number
  game_wins_deathmatch?: number
  headshot_kills?: number
  pocket_change?: number
  bombs_defused?: number
  grenadeKills?: number
  bombs_planted?: number
  grenade_kills?: number
  packages?: object
  magnumKills?: number
  magnumHeadshots?: number
  criminal_kills?: number
  carbineKills?: number
  assists?: number
  cop_kills?: number
  game_wins_temple?: number
  shotgunHeadshots?: number
  autoShotgunKills?: number
  kills_gungame?: number
  scopedRifleHeadshots?: number
  handgunKills?: number
  game_wins_gungame?: number
  level?: number
  score?: number
  rifleHeadshots?: number
  rifleKills?: number
  game_wins_junction?: number
  knife_kills?: number
  carbineHeadshots?: number
  game_wins_harbor?: number
  handgunHeadshots?: number
  'game_wins_melon factory v2'?: number
  game_wins_alleyway?: number
  game_wins_derailed?: number
  game_wins_riviera?: number
  scopedRifleKills?: number
  smgHeadshots?: number
  smgKills?: number
  handgun_cost_reduction?: number
  game_wins_ruins?: number
  'game_wins_atomic v2'?: number
  game_wins_overgrown?: number
  game_wins_sandstorm?: number
  shotgunKills?: number
  sniperKills?: number
  handgun_damage_increase?: number
  handgun_recoil_reduction?: number
  handgun_reload_speed_reduction?: number
  magnum_damage_increase?: number
  magnum_recoil_reduction?: number
  magnum_reload_speed_reduction?: number
  magnum_cost_reduction?: number
  rifle_damage_increase?: number
  rifle_recoil_reduction?: number
  rifle_reload_speed_reduction?: number
  rifle_cost_reduction?: number
  shotgun_damage_increase?: number
  shotgun_recoil_reduction?: number
  shotgun_reload_speed_reduction?: number
  shotgun_cost_reduction?: number
  pistol_damage_increase?: number
  pistol_recoil_reduction?: number
  pistol_reload_speed_reduction?: number
  scoped_rifle_damage_increase?: number
  scoped_rifle_recoil_reduction?: number
  scoped_rifle_cost_reduction?: number
  scoped_rifle_reload_speed_reduction?: number
  sniper_damage_increase?: number
  sniper_reload_speed_reduction?: number
  sniper_cost_reduction?: number
  carbine_damage_increase?: number
  carbine_recoil_reduction?: number
  carbine_reload_speed_reduction?: number
  carbine_cost_reduction?: number
  strength_training?: number
  bounty_hunter?: number
  sniperHeadshots?: number
  game_wins_bazaar?: number
  knife_attack_delay?: number
  knife_damage_increase?: number
  selectedKnifeDev?: string
  selectedOcelotHelmetDev?: string
  selectedOcelotChestplateDev?: string
  selectedCreeperHelmetDev?: string
  selectedCreeperChestplateDev?: string
  body_armor_cost?: number
  game_wins_castle?: number
  game_wins_reserve?: number
  bullpupKills?: number
  assists_deathmatch?: number
  criminal_kills_deathmatch?: number
  bullpup_cost_reduction?: number
  auto_shotgun_cost_reduction?: number
  assists_gungame?: number
  bullpupHeadshots?: number
  care_packages_collected_gungame?: number
  deaths_gungame?: number
  game_plays_gungame?: number
  speed_boosts_collected_gungame?: number
  autoShotgunHeadshots?: number
  bullpup_damage_increase?: number
  bullpup_recoil_reduction?: number
  bullpup_reload_speed_reduction?: number
  auto_shotgun_reload_speed_reduction?: number
  auto_shotgun_recoil_reduction?: number
  auto_shotgun_damage_increase?: number
  smg_damage_increase?: number
  smg_cost_reduction?: number
  claimed_level_rewards?: object
  perk?: object
  shoutTotal?: number
  armor_packs_collected_gungame?: number
  fastest_win_gungame?: number
  game_wins_atomic?: number
  'game_wins_melon factory'?: number
  lobbyPrefixColor?: string
  show_lobby_prefix?: boolean
  selected_lobby_prefix?: string
  show_kills_in_prefix?: boolean
  selectedMagnumDev?: string
  criminal_kills_gungame?: number
  cop_kills_gungame?: number
  selectedPistolDev?: string
  leaderboardSettings?: object
  selectedBullpupDev?: string
  selectedRifleDev?: string
  setting_hints?: boolean
  setting_sounds_bodyshot?: boolean
  setting_animated_smoke?: boolean
  active_emblem?: string
  active_scheme?: string
  selectedSmgDev?: string
  selectedCarbineDev?: string
  selectedShotgunDev?: string
  selectedScopedRifleDev?: string
  selectedHandgunDev?: string
  selectedAutoShotgunDev?: string
  active_glyph?: string
  smg_recoil_reduction?: number
  smg_reload_speed_reduction?: number
  kills_10_2014?: number
  kills_3_10_2014?: number
  mcgo?: object
  weekly_kills_b?: number
  monthly_kills_a?: number
  lastTourneyAd?: number
  bombs_planted_tourney_mcgo_defusal_0?: number
  cop_kills_tourney_mcgo_defusal_0?: number
  criminal_kills_tourney_mcgo_defusal_0?: number
  deaths_tourney_mcgo_defusal_0?: number
  game_plays_tourney_mcgo_defusal_0?: number
  headshot_kills_tourney_mcgo_defusal_0?: number
  kills_tourney_mcgo_defusal_0?: number
  round_wins_tourney_mcgo_defusal_0?: number
  shots_fired_tourney_mcgo_defusal_0?: number
  bombs_defused_tourney_mcgo_defusal_0?: number
  game_wins_tourney_mcgo_defusal_0?: number
  cop_kills_tourney_mcgo_defusal_1?: number
  criminal_kills_tourney_mcgo_defusal_1?: number
  game_plays_tourney_mcgo_defusal_1?: number
  game_wins_tourney_mcgo_defusal_1?: number
  headshot_kills_tourney_mcgo_defusal_1?: number
  kills_tourney_mcgo_defusal_1?: number
  round_wins_tourney_mcgo_defusal_1?: number
  shots_fired_tourney_mcgo_defusal_1?: number
  deaths_tourney_mcgo_defusal_1?: number
  bombs_planted_tourney_mcgo_defusal_1?: number
  bombs_defused_tourney_mcgo_defusal_1?: number
  grenade_kills_tourney_mcgo_defusal_1?: number
  shop_sort?: string
  monthly_kills_b?: number
  weekly_kills_a?: number
  privategames?: object

  setting_sounds_headshot?: boolean
  shop_sort_enable_owned_first?: boolean
  setting_screen_tint?: boolean
  setting_spawn_area?: boolean
  setting_defuse_tip_hologram?: boolean
  setting_money_messages?: boolean
}

export type PlayerData = {
  uuid: string
  displayname: string
  networkExp: number
  firstLogin: number
  lastLogin: number
  lastLogout: number
  mostRecentGameType: string
  newPackageRank: string
  rank: string
  stats: McgoStats
}

export type HypixelPlayerAPIResponse = {
  success: boolean
  player: {
    uuid: string
    displayname: string
    networkExp: number
    firstLogin: number
    lastLogin: number
    lastLogout: number
    mostRecentGameType: string
    newPackageRank: string
    rank: string
    stats: {
      MCGO: McgoStats
    }
  }
}

export type CvcStats = {
  uuid: string
  displayname: string
  firstLogin: number
  lastLogin: number
  lastLogout: number
  networkExp: number
  mostRecentGameType: string
  rank: string

  kills?: number
  deaths?: number
  game_plays?: number
  game_wins?: number
  game_wins_carrier?: number
  round_wins?: number
  shots_fired?: number
  headshot_kills?: number
  bombs_defused?: number
  bombs_planted?: number
  criminal_kills?: number
  assists?: number
  cop_kills?: number
  level?: number
  score?: number
  knife_kills?: number
  grenade_kills?: number

  guns: GunsStats
  modes: ModesStats
}

export type FullCvcStats = CvcStats & ExtraCvcStats

export type ExtraCvcStats = {
  coins?: number
  pocket_change?: number
  game_wins_temple?: number
  game_wins_junction?: number
  game_wins_harbor?: number
  'game_wins_melon factory v2'?: number
  game_wins_alleyway?: number
  game_wins_derailed?: number
  game_wins_riviera?: number
  handgun_cost_reduction?: number
  game_wins_ruins?: number
  'game_wins_atomic v2'?: number
  game_wins_overgrown?: number
  game_wins_sandstorm?: number
  handgun_damage_increase?: number
  handgun_recoil_reduction?: number
  handgun_reload_speed_reduction?: number
  magnum_damage_increase?: number
  magnum_recoil_reduction?: number
  magnum_reload_speed_reduction?: number
  magnum_cost_reduction?: number
  rifle_damage_increase?: number
  rifle_recoil_reduction?: number
  rifle_reload_speed_reduction?: number
  rifle_cost_reduction?: number
  shotgun_damage_increase?: number
  shotgun_recoil_reduction?: number
  shotgun_reload_speed_reduction?: number
  shotgun_cost_reduction?: number
  pistol_damage_increase?: number
  pistol_recoil_reduction?: number
  pistol_reload_speed_reduction?: number
  scoped_rifle_damage_increase?: number
  scoped_rifle_recoil_reduction?: number
  scoped_rifle_cost_reduction?: number
  scoped_rifle_reload_speed_reduction?: number
  sniper_damage_increase?: number
  sniper_reload_speed_reduction?: number
  sniper_cost_reduction?: number
  carbine_damage_increase?: number
  carbine_recoil_reduction?: number
  carbine_reload_speed_reduction?: number
  carbine_cost_reduction?: number
  strength_training?: number
  bounty_hunter?: number
  game_wins_bazaar?: number
  knife_attack_delay?: number
  knife_damage_increase?: number
  body_armor_cost?: number
  game_wins_castle?: number
  game_wins_reserve?: number
  bullpup_cost_reduction?: number
  auto_shotgun_cost_reduction?: number
  // care_packages_collected_gungame?: number
  // speed_boosts_collected_gungame?: number
  bullpup_damage_increase?: number
  bullpup_recoil_reduction?: number
  bullpup_reload_speed_reduction?: number
  auto_shotgun_reload_speed_reduction?: number
  auto_shotgun_recoil_reduction?: number
  auto_shotgun_damage_increase?: number
  smg_damage_increase?: number
  smg_cost_reduction?: number
  // shoutTotal?: number
  // armor_packs_collected_gungame?: number
  fastest_win_gungame?: number
  game_wins_atomic?: number
  'game_wins_melon factory'?: number
  smg_recoil_reduction?: number
  smg_reload_speed_reduction?: number
}

type ExtraKey = keyof ExtraCvcStats
// must manually generate from ExtraCvcStats type
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
