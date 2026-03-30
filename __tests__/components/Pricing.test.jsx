import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Pricing from '@/components/Pricing'

describe('Pricing component', () => {
  it('renders Free and Pro plans', () => {
    render(<Pricing />)
    expect(screen.getByText('Free')).toBeInTheDocument()
    expect(screen.getByText('Pro')).toBeInTheDocument()
  })

  it('shows correct prices', () => {
    render(<Pricing />)
    expect(screen.getByText('$0')).toBeInTheDocument()
    expect(screen.getByText('$20')).toBeInTheDocument()
  })

  it('renders download and upgrade buttons', () => {
    render(<Pricing />)
    expect(screen.getByText('Download free')).toBeInTheDocument()
    expect(screen.getByText('Get Pro — $20/mo')).toBeInTheDocument()
  })

  it('renders feature lists', () => {
    render(<Pricing />)
    expect(screen.getByText('Unlimited sessions')).toBeInTheDocument()
    expect(screen.getByText('Priority support')).toBeInTheDocument()
  })
})
