import { ConvexProvider, ConvexReactClient } from 'convex/react'

const CONVEX_URL =
  typeof window === 'undefined'
    ? process.env.VITE_CONVEX_URL
    : import.meta.env.VITE_CONVEX_URL

if (!CONVEX_URL) {
  throw new Error(
    'Missing VITE_CONVEX_URL. Set it in Vercel project environment variables and local .env.local.'
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
