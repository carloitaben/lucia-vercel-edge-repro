import { Discord } from "arctic"
import { Lucia } from "lucia"
import { LibSQLAdapter } from "@lucia-auth/adapter-sqlite"
import { createClient } from "libsql-stateless-easy"

const db = createClient({
  url: import.meta.env.DATABASE_URL || "http://127.0.0.1:8080",
  authToken: import.meta.env.DATABASE_AUTH_TOKEN || "",
})

const adapter = new LibSQLAdapter(db, {
  session: "session",
  user: "user",
})

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      // set to `true` when using HTTPS
      secure: process.env.NODE_ENV === "production",
    },
  },
})

// IMPORTANT!
declare module "lucia" {
  interface Register {
    Lucia: typeof lucia
  }
}

export const discord = new Discord(
  import.meta.env.DISCORD_OAUTH_ID || "",
  import.meta.env.DISCORD_OAUTH_SECRET || "",
  "http://localhost:3000/api/auth/callback/discord"
)
