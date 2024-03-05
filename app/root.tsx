import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react"
import type { LoaderFunctionArgs } from "@vercel/remix"
import { lucia } from "./auth.server"

export const config = {
  runtime: "edge",
}

export async function loader({ request }: LoaderFunctionArgs) {
  const sessionId = lucia.readSessionCookie(request.headers.get("Cookie") ?? "")

  if (!sessionId) {
    return {
      user: null,
      session: null,
    }
  }

  return lucia.validateSession(sessionId)
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}
