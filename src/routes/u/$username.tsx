import { createFileRoute, Link } from '@tanstack/react-router'
import { getHypixelStats, getPlayerUUID } from '../../lib/utils'
import SimpleStat from '../../components/SimpleStat'

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
  errorComponent: ({ error }) => (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Lookup Failed</h1>
      <p className="text-muted-foreground mb-6">{error.message}</p>
      <Link
        to="/"
        className="text-muted-foreground underline underline-offset-2"
      >
        Lookup another player
      </Link>
    </div>
  ),
})

function RouteComponent() {
  const p = Route.useLoaderData()
  const { username } = Route.useParams()

  return (
    <div className="max-w-4xl mx-auto">
      <p className="text-2xl text-muted-foreground mb-2">
        Stats for "{username}"
      </p>
      <h1 className="text-5xl font-bold mb-1">{p.username ?? username}</h1>
      <h2 className="text-lg mb-4">
        UUID: <span className="text-muted-foreground">{p.id}</span>
      </h2>

      <div className="border p-5">
        <SimpleStat label="CVC Level" value={p.stats.level} />
        <SimpleStat label="Kills" value={p.stats.kills} />
        <SimpleStat label="Headshot kils" value={p.stats.headshot_kills} />
        <SimpleStat
          label="Headshot Kill Percentage"
          value={(p.stats.headshot_kills / p.stats.kills) * 100}
          isPercent={true}
        />
        <SimpleStat label="Deaths" value={p.stats.deaths} />
        <SimpleStat label="K/D" value={p.stats.kills / p.stats.deaths} />
        <SimpleStat label="Game Wins" value={p.stats.game_wins} />
        <SimpleStat
          label="Game Win Percentage"
          value={(p.stats.game_wins / p.stats.game_plays) * 100}
          isPercent={true}
        />
        <SimpleStat label="Knife Kills" value={p.stats.knife_kills} />
        <SimpleStat label="Bombs Defused" value={p.stats.bombs_defused} />
        <SimpleStat label="Bombs Planted" value={p.stats.bombs_planted} />
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
