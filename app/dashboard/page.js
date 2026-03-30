import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import SignOutButton from '@/components/SignOutButton'

export default async function DashboardPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle()

  const { data: prompts } = await supabase
    .from('prompt_history')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(5)

  const plan = profile?.plan ?? 'free'
  const displayName = user.user_metadata?.full_name ?? user.email
  const avatarUrl = user.user_metadata?.avatar_url

  return (
    <div className="wrap">
      <Nav />
      <main className="dashboard-main">
        <div className="dashboard-inner">

          {/* Header */}
          <div className="dashboard-header">
            <div className="dashboard-user">
              {avatarUrl && (
                <img src={avatarUrl} alt={displayName} className="dashboard-avatar" />
              )}
              <div>
                <div className="section-label">Dashboard</div>
                <h1 className="dashboard-name">{displayName}</h1>
              </div>
            </div>
            <SignOutButton />
          </div>

          {/* Stats */}
          <div className="dashboard-grid">
            <div className="dashboard-card">
              <div className="dashboard-card-label">Current Plan</div>
              <div className="dashboard-stat">{plan === 'pro' ? 'Pro' : 'Free'}</div>
              {plan === 'free' && (
                <a
                  href="#"
                  className="btn btn-primary"
                  style={{ fontSize: '13px', alignSelf: 'flex-start', marginTop: '4px' }}
                >
                  Upgrade to Pro
                </a>
              )}
            </div>
            <div className="dashboard-card">
              <div className="dashboard-card-label">Prompts refined</div>
              <div className="dashboard-stat">{prompts?.length ?? 0}</div>
            </div>
          </div>

          {/* Prompt history */}
          <div>
            <div className="section-label" style={{ marginBottom: '16px' }}>Recent prompts</div>
            {!prompts || prompts.length === 0 ? (
              <div className="dashboard-empty">
                No prompts yet. Download the app to get started.
              </div>
            ) : (
              <div className="dashboard-history">
                {prompts.map((p) => (
                  <div key={p.id} className="dashboard-prompt-item">
                    <div className="dashboard-prompt-original">{p.original_prompt}</div>
                    {p.enhanced_prompt && (
                      <div className="dashboard-prompt-enhanced">{p.enhanced_prompt}</div>
                    )}
                    <div className="dashboard-prompt-meta">
                      {p.quality_before != null && p.quality_after != null && (
                        <span>Score: {p.quality_before} → {p.quality_after}</span>
                      )}
                      <span>{new Date(p.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </main>
      <Footer />
    </div>
  )
}
