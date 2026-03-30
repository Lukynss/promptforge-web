export default function CTA() {
  return (
    <section className="cta-section">
      <div className="section-label" style={{ display: 'inline-block' }}>Get started today</div>
      <h2 className="section-title">Stop writing bad prompts.<br /><em>Start forging great ones.</em></h2>
      <p className="section-sub">Free download for macOS. Your own API key, your own data, your own preferences.</p>
      <div className="cta-actions">
        <a href="#" className="btn btn-primary btn-lg">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
            <path d="M7.5 1v9M4 7l3.5 3.5L11 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M1 13h13" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Download for Mac — Free
        </a>
        <a href="#" className="btn btn-ghost btn-lg">View on GitHub</a>
      </div>
    </section>
  )
}
