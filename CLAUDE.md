# PromptForge — CLAUDE.md

## Project Overview
Landing page + web app for PromptForge — a macOS app that transforms rough prompts into precise AI instructions.

**Stack:** Next.js 14 (App Router) · Supabase (Auth + DB) · Vercel deployment

---

## Project Structure

```
app/                    Next.js App Router pages
  layout.js             Root layout, Google fonts (Cormorant Garamond + Inter)
  globals.css           All CSS — dark theme, CSS variables
  page.js               Landing page (assembles section components)
  login/page.js         Google OAuth login
  dashboard/page.js     Protected user dashboard (SSR)
  auth/callback/route.js  Supabase OAuth callback handler

components/             React components
  Nav.jsx               Client component — handles auth state
  Hero.jsx              Landing hero section
  HowItWorks.jsx        3-step explainer
  Features.jsx          Feature grid
  QuickMode.jsx         Quick Mode showcase
  Pricing.jsx           Pricing cards (Free / Pro)
  CTA.jsx               Call to action section
  Footer.jsx            Footer links
  SignOutButton.jsx      Client component — sign out with router.refresh()

lib/supabase/
  client.js             Browser Supabase client (createBrowserClient)
  server.js             Server Supabase client (createServerClient + cookies)

middleware.js           Protects /dashboard — redirects to /login if not authenticated
supabase/schema.sql     DB tables + RLS policies (run in Supabase SQL editor)
static/                 Original static HTML/CSS version (reference only)
__tests__/              Jest tests
```

---

## Design Language
- **Dark theme** — background `#070710`, surface `#10101a`
- **Accent** — amber `#c97d3a` / `#e09a5a`
- **Typography** — Cormorant Garamond (headings, serif) + Inter (body)
- **CSS variables** defined in `app/globals.css` `:root`
- Do not switch to light theme unless explicitly asked

---

## Supabase

### Tables
| Table | Purpose |
|-------|---------|
| `profiles` | User profile, auto-created on signup via trigger |
| `waitlist` | Email list signups |
| `prompt_history` | User's recent prompts (max shown: 5) |

### Auth
- Google OAuth only
- Callback: `/auth/callback`
- Protected routes: `/dashboard/*` (via middleware)

### Environment Variables
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```
Add to `.env.local` locally and Vercel environment variables for production.

---

## Development

```bash
npm run dev       # localhost:3000
npm test          # Jest — 18 tests across 5 suites
npm test:watch    # Watch mode
npm run build     # Production build
```

---

## Deployment (Vercel)
1. Push to GitHub
2. Import repo in Vercel
3. Add env variables in Vercel → Settings → Environment Variables
4. Add production redirect URL in Supabase:
   `Authentication → URL Configuration → https://your-app.vercel.app/auth/callback`

---

## Supabase MCP Server

Claude Code has the Supabase MCP server configured. This gives direct DB access from within Claude Code conversations.

```bash
# Already added — no need to re-run
claude mcp add supabase -- npx -y @supabase/mcp-server-supabase --access-token <token>
```

Use it to:
- Query tables directly (`profiles`, `waitlist`, `prompt_history`)
- Run schema migrations without opening the Supabase dashboard
- Inspect RLS policies and auth configuration

To run the schema for the first time, use the MCP server or paste `supabase/schema.sql` into the Supabase SQL editor.

---

## Known Limitations / TODO
- "Upgrade to Pro", "Terms", "Privacy Policy" links point to `#` — not yet implemented
- No Stripe integration yet (subscription management)
- No `error.js` / `not-found.js` custom error pages
- No email sending for waitlist
