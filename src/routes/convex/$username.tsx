import { createFileRoute, Link } from '@tanstack/react-router'
import { useAction } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { useEffect, useState } from 'react'
import type { CvcStats } from '../../lib/types'
import SimpleStatBox from '../../components/SimpleStatBox'

export const Route = createFileRoute('/convex/$username')({
  component: RouteComponent,
})

function RouteComponent() {
  const { username } = Route.useParams()
  const [player, setPlayer] = useState<CvcStats | null>(null)
  const getPlayerData = useAction(api.records.getHypixelStats)
  useEffect(() => {
    let cancelled = false
    const load = async () => {
      const start = performance.now()
      const data = await getPlayerData({ username: username.toLowerCase() })
      if (!cancelled) setPlayer(data)
      const elapsed = performance.now() - start
      console.log(`took ${elapsed}ms`)
    }
    load()
    return () => {
      cancelled = true
    }
  }, [username])

  return (
    <div>
      <div className="max-w-4xl mx-auto">
        <p className="text-2xl text-muted-foreground mb-2">
          Stats for "{username}"
        </p>
        <h1 className="text-5xl font-bold mb-1">
          {player?.displayname ?? username}
        </h1>
        <h2 className="text-lg mb-4">
          UUID: <span className="text-muted-foreground">{player?.uuid}</span>
        </h2>

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
