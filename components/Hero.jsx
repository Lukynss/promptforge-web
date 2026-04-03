import Link from 'next/link'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-orb" aria-hidden="true" />

      <div className="hero-content">
        <div className="hero-eyebrow">
          <span className="hero-eyebrow-dot"></span>
          Powered by Gemini Flash · Now available for macOS
        </div>

        <h1 className="hero-title hero-title-animate">
          Your prompts,<br /><em>finally precise.</em>
        </h1>

        <p className="hero-sub hero-sub-animate">
          PromptForge takes any rough idea, asks a few smart questions, and transforms it into a prompt that gets exactly what you want — every time.
        </p>

        <div className="hero-actions hero-actions-animate">
          <Link href="/upgrade" className="btn btn-primary btn-lg btn-download">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="btn-download-icon">
              <path d="M7.5 1v9M4 7l3.5 3.5L11 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1 13h13" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Get Pro — $3/mo
          </Link>
          <Link href="/app" className="btn btn-ghost btn-lg">Try web app →</Link>
        </div>

        <div className="hero-providers hero-providers-animate">
          <span className="hero-providers-label">Works with</span>
          <div className="provider-pill provider-pill-active"><span className="provider-dot" style={{ background: '#f55036' }}></span>Groq</div>
          <div className="provider-pill provider-pill-soon"><span className="provider-dot" style={{ background: '#4285F4', opacity: 0.5 }}></span>Gemini <span className="provider-soon">soon</span></div>
          <div className="provider-pill provider-pill-soon"><span className="provider-dot" style={{ background: '#10a37f', opacity: 0.5 }}></span>OpenAI <span className="provider-soon">soon</span></div>
          <div className="provider-pill provider-pill-soon"><span className="provider-dot" style={{ background: '#c97d3a', opacity: 0.5 }}></span>Anthropic <span className="provider-soon">soon</span></div>
        </div>
      </div>
    </section>
  )
}
