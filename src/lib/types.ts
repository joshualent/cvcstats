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

export type HypixelPlayerAPIResponse = {
  uuid: string
  displayname: string
  stats: {
    MCGO: {
      level: number
      kills: number
      deaths: number
      assists: number
      game_plays: number
      game_wins: number
      round_wins: number
      shots_fired: number
      headshot_kills: number
      bombs_defused: number
      bombs_planted: number
      knife_kills: number
    } & Record<string, JsonValue>
  } & Record<string, JsonValue>
} & Record<string, JsonValue>
