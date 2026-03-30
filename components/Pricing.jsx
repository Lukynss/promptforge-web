const CheckIcon = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
    <path d="M2 6.5l3 3 6-6" stroke="#c97d3a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export default function Pricing() {
  return (
    <section id="pricing">
      <div className="section-inner">
        <div className="section-label">Pricing</div>
        <h2 className="section-title">Simple, honest <em>pricing.</em></h2>
        <p className="section-sub">Start free with your own API key. Upgrade when you want convenience.</p>

        <div className="pricing-grid">
          {/* Free */}
          <div className="pricing-card">
            <div>
              <div className="pricing-name">Free</div>
              <div className="pricing-price">$0<span> / forever</span></div>
            </div>
            <div className="pricing-features">
              <div className="pricing-feature"><CheckIcon />Your own Gemini, OpenAI, Anthropic or Groq key</div>
              <div className="pricing-feature"><CheckIcon />Unlimited sessions</div>
              <div className="pricing-feature"><CheckIcon />Quick Mode (⌥ Space)</div>
              <div className="pricing-feature"><CheckIcon />Full history &amp; personalization</div>
            </div>
            <a href="#" className="btn btn-ghost" style={{ textAlign: 'center', justifyContent: 'center', fontSize: '13px' }}>
              Download free
            </a>
          </div>

          {/* Pro */}
          <div className="pricing-card featured">
            <div>
              <div className="pricing-name" style={{ color: 'var(--accent-soft)' }}>Pro</div>
              <div className="pricing-price">$20<span> / month</span></div>
            </div>
            <div className="pricing-features">
              <div className="pricing-feature"><CheckIcon />Our API included — no key needed</div>
              <div className="pricing-feature"><CheckIcon />Gemini 2.0 Flash, always latest model</div>
              <div className="pricing-feature"><CheckIcon />Preference sync across devices</div>
              <div className="pricing-feature"><CheckIcon />Priority support</div>
            </div>
            <a href="#" className="btn btn-primary" style={{ textAlign: 'center', justifyContent: 'center', fontSize: '13px' }}>
              Get Pro — $20/mo
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
