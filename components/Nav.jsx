'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const supabaseConfigured =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export default function Nav() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (!supabaseConfigured) return

    let subscription
    import('@/lib/supabase/client').then(({ createClient }) => {
      const supabase = createClient()
      supabase.auth.getUser().then(({ data: { user } }) => setUser(user))
      const { data } = supabase.auth.onAuthStateChange((_, session) => {
        setUser(session?.user ?? null)
      })
      subscription = data.subscription
    })

    return () => subscription?.unsubscribe()
  }, [])

  return (
    <nav>
      <Link href="/" className="nav-logo">
        <div className="nav-logo-icon">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M1.5 11L5 3.5 8.5 8 11 5l1.5 3.5" stroke="#c97d3a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="11" cy="3" r="1.4" fill="#e09a5a"/>
          </svg>
        </div>
        PromptForge
      </Link>

      <div className="nav-links">
        <Link href="/#how" className="nav-link">How it works</Link>
        <Link href="/#features" className="nav-link">Features</Link>
        <Link href="/#quick" className="nav-link">Quick Mode</Link>
        <Link href="/#pricing" className="nav-link">Pricing</Link>

        {user ? (
          <Link
            href="/dashboard"
            className="btn btn-ghost"
            style={{ fontSize: '13px', padding: '7px 14px', borderRadius: '9px' }}
          >
            Dashboard
          </Link>
        ) : (
          <>
            <Link
              href="/login"
              className="btn btn-ghost"
              style={{ fontSize: '13px', padding: '7px 14px', borderRadius: '9px' }}
            >
              Sign in
            </Link>
            <Link
              href="#"
              className="btn btn-primary"
              style={{ fontSize: '13px', padding: '7px 14px', borderRadius: '9px' }}
            >
              Download
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}
