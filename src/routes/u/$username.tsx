import { createFileRoute, Link, useLoaderData } from '@tanstack/react-router'
import { getHypixelStats, getPlayerUUID } from '../../lib/utils'
import SimpleStat from '../../components/SimpeStat'

export const Route = createFileRoute('/u/$username')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const mojangResponse = await getPlayerUUID({
      data: { username: params.username },
    })
    const hypixelResponse = await getHypixelStats({
      data: { uuid: mojangResponse.id },
    })
    return {
      id: mojangResponse.id,
      username: mojangResponse.name,
      ...hypixelResponse,
    }
  },
  staleTime: 30 * 60_000,
  gcTime: 30 * 60_000,
})

function RouteComponent() {
  const playerInfo = Route.useLoaderData()
  const { username } = Route.useParams()
  console.log(playerInfo)

  return (
    <div className="max-w-4xl mx-auto">
      <p className="text-2xl text-muted-foreground mb-2">
        Stats for "{username}"
      </p>
      <h1 className="text-5xl font-bold mb-1">
        {playerInfo.username ?? username}
      </h1>
      <h2 className="text-lg mb-4">
        UUID: <span className="text-muted-foreground">{playerInfo.id}</span>
      </h2>

      <div className="border p-5">
        <SimpleStat label="Kills" value={playerInfo.stats.MCGO.kills} />
        <SimpleStat
          label="Headshot kils"
          value={playerInfo.stats.MCGO.headshot_kills}
        />
        <SimpleStat
          label="Headshot Kill Percentage"
          value={
            (playerInfo.stats.MCGO.headshot_kills /
              playerInfo.stats.MCGO.kills) *
            100
          }
          isPercent={true}
        />
        <SimpleStat label="Deaths" value={playerInfo.stats.MCGO.deaths} />
        <SimpleStat
          label="K/D"
          value={playerInfo.stats.MCGO.kills / playerInfo.stats.MCGO.deaths}
        />
        <SimpleStat label="Game Wins" value={playerInfo.stats.MCGO.game_wins} />
        <SimpleStat
          label="Game Win Percentage"
          value={
            (playerInfo.stats.MCGO.game_wins /
              playerInfo.stats.MCGO.game_plays) *
            100
          }
          isPercent={true}
        />
        <SimpleStat
          label="Knife Kills"
          value={playerInfo.stats.MCGO.knife_kills}
        />
        <SimpleStat label="Game Wins" value={playerInfo.stats.MCGO.game_wins} />
      </div>
      <p className="text-lg text-muted-foreground mt-8">
        This app is still in development! 💀
      </p>
      <p className="text-center">
        <Link
          to="/"
          className="text-muted-foreground text-lg underline underline-offset-2"
        >
          Lookup another player
        </Link>
      </p>
    </div>
  )
}
