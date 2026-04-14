import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/u/$username')({
  component: RouteComponent,
})

function RouteComponent() {
  const { username } = Route.useParams()
  return (
    <div className="max-w-4xl mx-auto">
      <p className="text-2xl text-muted-foreground mb-2">
        Stats for "{username}"
      </p>
      <h1 className="text-5xl font-bold mb-1">{username}</h1>

      <p className="text-lg text-muted-foreground">
        This app is still in development! 💀
      </p>
    </div>
  )
}
