import { createFileRoute, Link } from '@tanstack/react-router'
import { useAction, useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'

export const Route = createFileRoute('/convex/$username')({
  component: RouteComponent,
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
  const { username } = Route.useParams()
  const data = useQuery(api.records.getPlayerAndLatestRecord, {
    username: username,
  })
  const isLoading = data === undefined
  if (!isLoading) {
    if (data.player !== null) {
    }
  }
  console.log(data)

  return <div>{data?.player?.uuid}</div>
}
