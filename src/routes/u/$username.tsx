import { createFileRoute, Link } from '@tanstack/react-router'
import { getHypixelStats, getPlayerUUID } from '../../lib/utils'
import SimpleStatBox from '../../components/SimpleStatBox'

export const Route = createFileRoute('/u/$username')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const start = performance.now()
    const mojangResponse = await getPlayerUUID({
      data: { username: params.username },
    })
    console.log(performance.now() - start)
    const hypixelResponse = await getHypixelStats({
      data: { uuid: mojangResponse.id },
    })
    console.log(performance.now() - start)
    return hypixelResponse
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
  const player = Route.useLoaderData()
  const { username } = Route.useParams()

  return (
    <div className="max-w-4xl mx-auto">
      <p className="text-2xl text-muted-foreground mb-2">
        Stats for "{username}"
      </p>
      <h1 className="text-5xl font-bold mb-1">
        {player.displayname ?? username}
      </h1>
      <h2 className="text-lg mb-4">
        UUID: <span className="text-muted-foreground">{player.uuid}</span>
      </h2>

      <SimpleStatBox player={player} />

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
