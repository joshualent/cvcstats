import SimpleStat from './SimpleStat'
import { type StatsShape } from '../../convex/lib/types'

export default function SimpleStatBox({ player }: { player: StatsShape }) {
  if (!player.kills && !player.deaths)
    return (
      <div className="text-center text-lg">
        This player does not have cops vs. crims stats
      </div>
    )
  return (
    <div className="border p-5">
      <SimpleStat label="CVC Level" value={player.level} />
      <SimpleStat label="Kills" value={player.kills} />
      <SimpleStat label="Headshot kills" value={player.headshot_kills} />
      {player.headshot_kills != null && player.kills != null && (
        <SimpleStat
          label="Headshot Kill Percentage"
          value={(player.headshot_kills / player.kills) * 100}
          isPercent={true}
        />
      )}
      <SimpleStat label="Deaths" value={player.deaths} />
      {player.kills != null && player.deaths != null && (
        <SimpleStat label="K/D" value={player.kills / player.deaths} />
      )}
      <SimpleStat label="Game Wins" value={player.game_wins} />
      {player.game_wins != null && player.game_plays != null && (
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
