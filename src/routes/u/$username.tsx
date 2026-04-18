import { createFileRoute, Link } from '@tanstack/react-router'
import { useAction } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { useEffect, useState } from 'react'
import SimpleStatBox from '../../components/SimpleStatBox'
import { type StatsShape } from '../../../convex/lib/types'

export const Route = createFileRoute('/u/$username')({
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
  const [player, setPlayer] = useState<StatsShape | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const getPlayerData = useAction(api.records.getHypixelStats)
  useEffect(() => {
    let cancelled = false
    const load = async () => {
      const data = await getPlayerData({ username: username.toLowerCase() })
      if (!cancelled) {
        if (data.ok) {
          setPlayer(data.data)
        } else {
          setError(new Error(data.code))
        }
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [username])

  if (error) throw error

  return (
    <div>
      <div className="max-w-4xl mx-auto">
        <p className="text-2xl text-muted-foreground mb-2">
          Stats for "{username}"
        </p>
        <h1 className="text-5xl font-bold mb-1">
          {player?.displayname ?? username}
        </h1>
        {player?.uuid && (
          <h2 className="text-lg mb-4">
            UUID: <span className="text-muted-foreground">{player?.uuid}</span>
          </h2>
        )}

        {player && <SimpleStatBox player={player} />}

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
    </div>
  )
}
