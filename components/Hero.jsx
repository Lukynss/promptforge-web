import Link from 'next/link'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-eyebrow">
        <span className="hero-eyebrow-dot"></span>
        Powered by Gemini Flash · Now available for macOS
      </div>

      <h1 className="hero-title">
        Your prompts,<br /><em>finally precise.</em>
      </h1>

      <p className="hero-sub">
        PromptForge takes any rough idea, asks a few smart questions, and transforms it into a prompt that gets exactly what you want — every time.
      </p>

      <div className="hero-actions">
        <a href="#" className="btn btn-primary btn-lg">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
            <path d="M7.5 1v9M4 7l3.5 3.5L11 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M1 13h13" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Download for Mac — Free
        </a>
        <Link href="#how" className="btn btn-ghost btn-lg">See how it works →</Link>
      </div>

      <div className="hero-providers">
        <span className="hero-providers-label">Works with</span>
        <div className="provider-pill"><span className="provider-dot" style={{ background: '#4285F4' }}></span>Gemini</div>
        <div className="provider-pill"><span className="provider-dot" style={{ background: '#10a37f' }}></span>OpenAI</div>
        <div className="provider-pill"><span className="provider-dot" style={{ background: '#c97d3a' }}></span>Anthropic</div>
        <div className="provider-pill"><span className="provider-dot" style={{ background: '#f55036' }}></span>Groq</div>
      </div>
    </section>
  )
}
