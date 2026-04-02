'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Nav from '@/components/Nav'
import { createClient } from '@/lib/supabase/client'

const STEPS = {
  INPUT: 'input',
  LOADING_Q: 'loading_q',
  QUESTIONS: 'questions',
  LOADING_R: 'loading_r',
  RESULT: 'result',
}

const EXAMPLES = [
  'Write a cover letter for a software engineer role',
  'Make a landing page for my SaaS product',
  'Explain quantum computing to a 10-year-old',
  'Help me debug this React component',
]

export default function AppPage() {
  const router = useRouter()
  const supabase = useRef(createClient()).current

  const [user, setUser] = useState(null)
  const [step, setStep] = useState(STEPS.INPUT)
  const [roughPrompt, setRoughPrompt] = useState('')
  const [questions, setQuestions] = useState([])
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState([])
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [customAnswer, setCustomAnswer] = useState('')
  const [showCustom, setShowCustom] = useState(false)
  const [copied, setCopied] = useState(false)
  const [usedToday, setUsedToday] = useState(null)

  // Load auth state once on mount
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  // Keyboard shortcuts for question options
  useEffect(() => {
    if (step !== STEPS.QUESTIONS) return
    const q = questions[currentQ]
    if (!q) return
    const handler = (e) => {
      const num = parseInt(e.key)
      if (num >= 1 && num <= q.options.length) handleAnswer(q.options[num - 1])
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [step, currentQ, questions])

  const handleStart = async () => {
    if (!roughPrompt.trim()) return
    setStep(STEPS.LOADING_Q)
    setError(null)
    try {
      const res = await fetch('/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: roughPrompt }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to generate questions')
      setQuestions(data.questions)
      setAnswers([])
      setCurrentQ(0)
      setShowCustom(false)
      setStep(STEPS.QUESTIONS)
    } catch (e) {
      setError(e.message)
      setStep(STEPS.INPUT)
    }
  }

  const handleAnswer = async (answer) => {
    const newAnswers = [...answers, answer]
    setAnswers(newAnswers)

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1)
      setShowCustom(false)
      setCustomAnswer('')
      return
    }

    // Last answer — generate refined prompt
    setStep(STEPS.LOADING_R)
    try {
      const res = await fetch('/api/refine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: roughPrompt,
          questions: questions.map(q => q.q),
          answers: newAnswers,
        }),
      })
      const data = await res.json()

      if (res.status === 429) {
        setError(`limit_reached:${data.used ?? 5}:${data.limit ?? 5}`)
        setStep(STEPS.INPUT)
        return
      }
      if (!res.ok) throw new Error(data.error || 'Failed to refine prompt')

      setResult(data)
      setStep(STEPS.RESULT)

      // ── Client-side save ─────────────────────────────────────────────────
      // Uses the browser Supabase session directly — most reliable approach.
      if (user) {
        const { error: saveErr } = await supabase.from('prompt_history').insert({
          user_id: user.id,
          original_prompt: roughPrompt,
          enhanced_prompt: data.refined,
          quality_before: Math.round(data.original_score ?? 0),
          quality_after: Math.round(data.refined_score ?? 0),
        })
        if (saveErr) {
          console.error('[history] save failed:', saveErr.message)
        } else {
          // Refresh today's count to display accurate usage
          const todayStart = new Date()
          todayStart.setHours(0, 0, 0, 0)
          const { count } = await supabase
            .from('prompt_history')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', user.id)
            .gte('created_at', todayStart.toISOString())
          setUsedToday(count ?? 1)
        }
      }
    } catch (e) {
      setError(e.message)
      setStep(STEPS.INPUT)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(result.refined)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleReset = () => {
    setStep(STEPS.INPUT)
    setRoughPrompt('')
    setQuestions([])
    setAnswers([])
    setCurrentQ(0)
    setResult(null)
    setError(null)
    setShowCustom(false)
    setCustomAnswer('')
    setCopied(false)
    setUsedToday(null)
  }

  const DAILY_LIMIT = result?.limit ?? 5

  return (
    <div className="wrap">
      <Nav />
      <main className="forge-main">

        {/* ── INPUT ── */}
        {step === STEPS.INPUT && (
          <div className="forge-step">
            <div className="forge-eyebrow">
              <span className="hero-eyebrow-dot" />
              PromptForge Web
            </div>
            <h1 className="forge-title">What do you want<br /><em>to create?</em></h1>
            <p className="forge-sub">
              Paste any rough prompt. We'll ask a few smart questions and return something far more precise.
            </p>

            {error && (
              <div
                className={error.startsWith('limit_reached') ? 'forge-limit-banner' : 'auth-error'}
                style={{ maxWidth: '560px', width: '100%' }}
              >
                {error.startsWith('limit_reached') ? (
                  <>
                    You&apos;ve used all {error.split(':')[2]} free forges today.{' '}
                    <a href="/upgrade" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
                      Upgrade to Pro
                    </a>{' '}for unlimited access.
                  </>
                ) : error.includes('GROQ_API_KEY') ? (
                  <>Add <code>GROQ_API_KEY</code> to your <code>.env.local</code></>
                ) : error}
              </div>
            )}

            <div className="forge-input-wrap">
              <textarea
                className="forge-textarea"
                placeholder="e.g. Write me a cover letter, build a landing page for my SaaS, explain machine learning..."
                value={roughPrompt}
                onChange={e => setRoughPrompt(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey) && roughPrompt.trim()) handleStart() }}
                rows={4}
                autoFocus
              />
              <span className="forge-input-hint">⌘↵ to submit</span>
            </div>

            <button
              className="btn btn-primary btn-lg forge-submit"
              onClick={handleStart}
              disabled={!roughPrompt.trim()}
            >
              Forge my prompt
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M7 3l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <div className="forge-examples">
              <span className="forge-examples-label">Try an example</span>
              {EXAMPLES.map(ex => (
                <button key={ex} className="forge-example-chip" onClick={() => setRoughPrompt(ex)}>
                  {ex}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── LOADING QUESTIONS ── */}
        {step === STEPS.LOADING_Q && (
          <div className="forge-step forge-loading-step">
            <div className="forge-spinner" />
            <p className="forge-loading-text">Analyzing your prompt…</p>
          </div>
        )}

        {/* ── QUESTIONS ── */}
        {step === STEPS.QUESTIONS && questions[currentQ] && (
          <div className="forge-step">
            <div className="forge-progress-row">
              {questions.map((_, i) => (
                <span
                  key={i}
                  className={`forge-prog-pip ${i < currentQ ? 'done' : ''} ${i === currentQ ? 'active' : ''}`}
                />
              ))}
            </div>
            <p className="forge-q-counter">Question {currentQ + 1} of {questions.length}</p>
            <h2 className="forge-question">{questions[currentQ].q}</h2>

            <div className="forge-options">
              {questions[currentQ].options.map((opt, i) => (
                <button key={i} className="forge-option" onClick={() => handleAnswer(opt)}>
                  <span className="forge-opt-num">{i + 1}</span>
                  {opt}
                </button>
              ))}
              {!showCustom ? (
                <button className="forge-option forge-option-custom" onClick={() => setShowCustom(true)}>
                  <span className="forge-opt-num">✎</span>
                  Custom answer…
                </button>
              ) : (
                <div className="forge-custom-row">
                  <input
                    className="auth-input"
                    placeholder="Type your answer…"
                    value={customAnswer}
                    onChange={e => setCustomAnswer(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter' && customAnswer.trim()) handleAnswer(customAnswer) }}
                    autoFocus
                    style={{ flex: 1 }}
                  />
                  <button
                    className="btn btn-primary"
                    onClick={() => customAnswer.trim() && handleAnswer(customAnswer)}
                    disabled={!customAnswer.trim()}
                  >
                    Submit
                  </button>
                </div>
              )}
            </div>

            <p className="forge-kbd-hint">Press <kbd>1</kbd>–<kbd>{questions[currentQ].options.length}</kbd> to select</p>

            <button className="forge-back-btn" onClick={() => {
              if (currentQ > 0) {
                setCurrentQ(currentQ - 1)
                setAnswers(answers.slice(0, -1))
                setShowCustom(false)
                setCustomAnswer('')
              } else {
                handleReset()
              }
            }}>
              ← Back
            </button>
          </div>
        )}

        {/* ── LOADING RESULT ── */}
        {step === STEPS.LOADING_R && (
          <div className="forge-step forge-loading-step">
            <div className="forge-spinner" />
            <p className="forge-loading-text">Forging your prompt…</p>
          </div>
        )}

        {/* ── RESULT ── */}
        {step === STEPS.RESULT && result && (
          <div className="forge-step forge-result-step">
            <div className="forge-result-top">
              <div className="forge-result-badge">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l2.5 2.5 5.5-5.5" stroke="#6dbf7f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Prompt forged
              </div>
              <div className="forge-score-row">
                <span className="forge-score-before">{result.original_score}/10</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M8.5 4l4 4-4 4" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="forge-score-after">{result.refined_score}/10</span>
              </div>
            </div>

            {result.improvement && (
              <p className="forge-improvement">💡 {result.improvement}</p>
            )}

            <div className="forge-cards">
              <div className="forge-card forge-card-before">
                <div className="forge-card-label">Original</div>
                <p>{roughPrompt}</p>
              </div>

              <div className="forge-card forge-card-after">
                <div className="forge-card-label-row">
                  <span className="forge-card-label">Refined</span>
                  <button className={`forge-copy-btn${copied ? ' copied' : ''}`} onClick={handleCopy}>
                    {copied ? (
                      <>
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                          <path d="M2 6.5l3 3 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                          <rect x="4" y="4" width="7.5" height="7.5" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
                          <path d="M1.5 9V2a1 1 0 011-1H9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                        </svg>
                        Copy prompt
                      </>
                    )}
                  </button>
                </div>
                <p>{result.refined}</p>
              </div>
            </div>

            {user && usedToday != null && (
              <div className="forge-usage-row">
                <span className="forge-usage-pips">
                  {Array.from({ length: DAILY_LIMIT }).map((_, i) => (
                    <span key={i} className={`forge-usage-pip ${i < usedToday ? 'used' : ''}`} />
                  ))}
                </span>
                <span className="forge-usage-label">
                  {usedToday}/{DAILY_LIMIT} free forges today
                  {usedToday >= DAILY_LIMIT && (
                    <> · <a href="/upgrade" style={{ color: 'var(--accent)' }}>Upgrade for unlimited</a></>
                  )}
                </span>
              </div>
            )}

            <div className="forge-result-actions">
              <button className="btn btn-ghost" onClick={handleReset}>
                ← Try another prompt
              </button>
              {user ? (
                <button className="btn btn-primary" onClick={() => router.push('/dashboard')}>
                  View history →
                </button>
              ) : (
                <a href="/login" className="btn btn-primary">Sign in to save →</a>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
