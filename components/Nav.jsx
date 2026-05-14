'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

const supabaseConfigured =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export default function Nav() {
  const [user, setUser]       = useState(undefined)
  const [plan, setPlan]       = useState('free')
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      const el = document.documentElement
      const docH = el.scrollHeight - el.clientHeight
      setProgress(docH > 0 ? (window.scrollY / docH) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!supabaseConfigured) { setUser(null); return }

    const supabase = createClient()
    const loadUser = async (u) => {
      setUser(u)
      if (u) {
        const { data: profile } = await supabase
          .from('profiles').select('plan').eq('id', u.id).maybeSingle()
        setPlan(profile?.plan ?? 'free')
      } else {
        setPlan('free')
      }
    }
    const { data } = supabase.auth.onAuthStateChange((_, session) => {
      loadUser(session?.user ?? null)
    })
    return () => data.subscription.unsubscribe()
  }, [])

  const initial = (user?.user_metadata?.full_name?.[0] ?? user?.email?.[0] ?? '?').toUpperCase()

  return (
    <nav className={scrolled ? 'nav-scrolled' : ''}>
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
        <Link href="/#pricing" className="nav-link">Pricing</Link>
        <Link href="/app" className="nav-link nav-link-forge">Forge</Link>

        {user === undefined ? null : user ? (
          <>
            {plan === 'pro' ? (
              <span className="nav-pro-badge">Pro</span>
            ) : (
              <Link href="/upgrade" className="nav-upgrade-btn">Upgrade</Link>
            )}
            <Link href="/dashboard" className="nav-account-avatar" aria-label="Dashboard">
              {initial}
            </Link>
          </>
        ) : (
          <>
            <Link href="/login" className="nav-link">Sign in</Link>
            <Link href="/upgrade" className="btn btn-primary" style={{ fontSize: '13px', padding: '7px 15px', borderRadius: '9px' }}>
              Get Pro
            </Link>
          </>
        )}
      </div>

      <div className="nav-progress-bar" style={{ width: `${progress}%` }} aria-hidden="true" />
    </nav>
  )
}
