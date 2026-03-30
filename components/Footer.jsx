import Link from 'next/link'

export default function Footer() {
  return (
    <footer>
      <Link href="/" className="footer-logo">PromptForge</Link>
      <div className="footer-links">
        <Link href="#" className="footer-link">Privacy</Link>
        <Link href="#" className="footer-link">Terms</Link>
        <Link href="#" className="footer-link">GitHub</Link>
        <Link href="#" className="footer-link">Contact</Link>
      </div>
      <span className="footer-copy">© 2026 PromptForge. All rights reserved.</span>
    </footer>
  )
}
