import { ConvexProvider, ConvexReactClient } from 'convex/react'

const CONVEX_URL =
  import.meta.env.VITE_CONVEX_URL || process.env.VITE_CONVEX_URL

if (!CONVEX_URL) {
  throw new Error(
    'Missing VITE_CONVEX_URL. For Vercel production, use a build command that runs `convex deploy` with `--cmd-url-env-var-name VITE_CONVEX_URL`, or set the variable explicitly.'
  )
}

const convexClient = new ConvexReactClient(CONVEX_URL)

export default function AppConvexProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ConvexProvider client={convexClient}>{children}</ConvexProvider>
  )
}
