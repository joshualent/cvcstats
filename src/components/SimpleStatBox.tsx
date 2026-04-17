import type { CvcStats } from '../lib/types'
import SimpleStat from './SimpleStat'

export default function SimpleStatBox({ player }: { player: CvcStats }) {
  return (
    <div className="border p-5">
      <SimpleStat label="CVC Level" value={player.level} />
      <SimpleStat label="Kills" value={player.kills} />
      <SimpleStat label="Headshot kils" value={player.headshot_kills} />
      {player.headshot_kills && player.kills && (
        <SimpleStat
          label="Headshot Kill Percentage"
          value={(player.headshot_kills / player.kills) * 100}
          isPercent={true}
        />
      )}
      <SimpleStat label="Deaths" value={player.deaths} />
      {player.kills && player.deaths && (
        <SimpleStat label="K/D" value={player.kills / player.deaths} />
      )}
      <SimpleStat label="Game Wins" value={player.game_wins} />
      {player.game_wins && player.game_plays && (
        <SimpleStat
          label="Game Win Percentage"
          value={(player.game_wins / player.game_plays) * 100}
          isPercent={true}
        />
      )}
      <SimpleStat label="Knife Kills" value={player.knife_kills} />
      <SimpleStat label="Bombs Defused" value={player.bombs_defused} />
      <SimpleStat label="Bombs Planted" value={player.bombs_planted} />
    </div>
  )
}
