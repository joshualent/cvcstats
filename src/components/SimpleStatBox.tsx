import type { PlayerData } from '../lib/types'
import SimpleStat from './SimpleStat'

export default function SimpleStatBox({ player }: { player: PlayerData }) {
  return (
    <div className="border p-5">
      <SimpleStat label="CVC Level" value={player.stats.level} />
      <SimpleStat label="Kills" value={player.stats.kills} />
      <SimpleStat label="Headshot kils" value={player.stats.headshot_kills} />
      {player.stats.headshot_kills && player.stats.kills && (
        <SimpleStat
          label="Headshot Kill Percentage"
          value={(player.stats.headshot_kills / player.stats.kills) * 100}
          isPercent={true}
        />
      )}
      <SimpleStat label="Deaths" value={player.stats.deaths} />
      {player.stats.kills && player.stats.deaths && (
        <SimpleStat
          label="K/D"
          value={player.stats.kills / player.stats.deaths}
        />
      )}
      <SimpleStat label="Game Wins" value={player.stats.game_wins} />
      {player.stats.game_wins && player.stats.game_plays && (
        <SimpleStat
          label="Game Win Percentage"
          value={(player.stats.game_wins / player.stats.game_plays) * 100}
          isPercent={true}
        />
      )}
      <SimpleStat label="Knife Kills" value={player.stats.knife_kills} />
      <SimpleStat label="Bombs Defused" value={player.stats.bombs_defused} />
      <SimpleStat label="Bombs Planted" value={player.stats.bombs_planted} />
    </div>
  )
}
