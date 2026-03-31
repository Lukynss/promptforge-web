import Link from 'next/link'

export default function Hero() {
  return (
    <section className="hero">
      {/* Animated ambient orb */}
      <div className="hero-orb" aria-hidden="true" />

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
        <a href="#" className="btn btn-primary btn-lg btn-download">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="btn-download-icon">
            <path d="M7.5 1v9M4 7l3.5 3.5L11 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M1 13h13" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Download for Mac — Free
        </a>
        <Link href="#how" className="btn btn-ghost btn-lg">See how it works →</Link>
      </div>

      <div className="hero-providers hero-providers-animate">
        <span className="hero-providers-label">Works with</span>
        <div className="provider-pill"><span className="provider-dot" style={{ background: '#4285F4' }}></span>Gemini</div>
        <div className="provider-pill"><span className="provider-dot" style={{ background: '#10a37f' }}></span>OpenAI</div>
        <div className="provider-pill"><span className="provider-dot" style={{ background: '#c97d3a' }}></span>Anthropic</div>
        <div className="provider-pill"><span className="provider-dot" style={{ background: '#f55036' }}></span>Groq</div>
      </div>

      {/* Product mockup */}
      <div className="hero-mockup hero-mockup-animate">
        <div className="mockup-glow" aria-hidden="true" />
        <div className="mockup-window">
          {/* Title bar */}
          <div className="mockup-bar">
            <div className="mockup-traffic">
              <span style={{ background: '#ff5f57' }} />
              <span style={{ background: '#febc2e' }} />
              <span style={{ background: '#28c840' }} />
            </div>
            <div className="mockup-bar-title">
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M1 9.5L3.5 3 6.5 6.5 8.5 4l2 4" stroke="#c97d3a" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="8.5" cy="2.5" r="1.1" fill="#e09a5a"/>
              </svg>
              PromptForge
            </div>
            <div style={{ width: '52px' }} />
          </div>

          {/* Input row */}
          <div className="mockup-input-row">
            <div className="mockup-input-icon" aria-hidden="true">
              <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                <path d="M1 8L3.5 2 6.5 5.5 8 3.5 9 6" stroke="#c97d3a" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="mockup-input-text">Write a cover letter for a senior developer role at Stripe</span>
            <span className="mockup-cursor" aria-hidden="true" />
          </div>

          {/* Progress */}
          <div className="mockup-progress-row">
            <div className="mockup-prog-dots">
              <span className="mockup-prog-dot filled" />
              <span className="mockup-prog-dot filled" />
              <span className="mockup-prog-dot" />
              <span className="mockup-prog-dot" />
            </div>
            <span className="mockup-prog-label">Question 2 of 4</span>
          </div>

          {/* Question */}
          <div className="mockup-question-area">
            <div className="mockup-q-label">What tone should the letter have?</div>
            <div className="mockup-opts">
              <div className="mockup-opt">
                <span className="mockup-opt-num">1</span>
                <span className="mockup-opt-radio unsel" />
                Professional and formal
              </div>
              <div className="mockup-opt sel">
                <span className="mockup-opt-num">2</span>
                <span className="mockup-opt-radio sel" />
                Confident and direct
              </div>
              <div className="mockup-opt">
                <span className="mockup-opt-num">3</span>
                <span className="mockup-opt-radio unsel" />
                Warm and personal
              </div>
            </div>
          </div>

          {/* Output */}
          <div className="mockup-output">
            <div className="mockup-output-header">
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M2 5.5l2.5 2.5 5-5" stroke="#6dbf7f" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Enhanced prompt ready</span>
              <span className="mockup-score">9.2 / 10</span>
            </div>
            <p className="mockup-output-text">
              Write a compelling, confident cover letter for a Senior Software Engineer position at Stripe. Emphasize experience with distributed systems and developer tooling. Open with a specific insight about Stripe&apos;s infrastructure approach...
            </p>
          </div>
        </div>
      </div>

      {/* Platform note */}
      <p className="hero-platform-note">
        macOS 13+ · Apple Silicon &amp; Intel ·
        <span className="platform-coming">Windows &amp; Linux coming soon</span>
      </p>
    </section>
  )
}
