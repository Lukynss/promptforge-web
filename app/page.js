import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import HowItWorks from '@/components/HowItWorks'
import Features from '@/components/Features'
import QuickMode from '@/components/QuickMode'
import Pricing from '@/components/Pricing'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <div className="wrap">
      <Nav />
      <Hero />
      <div className="divider" />
      <HowItWorks />
      <div className="divider" />
      <Features />
      <div className="divider" />
      <QuickMode />
      <div className="divider" />
      <Pricing />
      <div className="divider" />
      <CTA />
      <Footer />
    </div>
  )
}
