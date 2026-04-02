import AnimateIn from '@/components/AnimateIn'

export default function AppPreview() {
  return (
    <section className="app-preview">
      <div className="section-inner">
        <AnimateIn>
          <div className="app-preview-label">
            <span className="hero-eyebrow-dot"></span>
            See it in action
          </div>
        </AnimateIn>

        <AnimateIn delay={80}>
          <div className="hero-mockup">
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
        </AnimateIn>

        <AnimateIn delay={140}>
          <p className="hero-platform-note" style={{ textAlign: 'center', marginTop: '20px' }}>
            macOS 13+ · Apple Silicon &amp; Intel ·
            <span className="platform-coming">Windows &amp; Linux coming soon</span>
          </p>
        </AnimateIn>
      </div>
    </section>
  )
}
