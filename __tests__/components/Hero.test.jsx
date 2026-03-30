import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Hero from '@/components/Hero'

jest.mock('next/link', () => {
  return function Link({ href, children, className }) {
    return <a href={href} className={className}>{children}</a>
  }
})

describe('Hero component', () => {
  it('renders the main headline', () => {
    render(<Hero />)
    expect(screen.getByText('Your prompts,')).toBeInTheDocument()
    expect(screen.getByText('finally precise.')).toBeInTheDocument()
  })

  it('renders the download button', () => {
    render(<Hero />)
    expect(screen.getByText('Download for Mac — Free')).toBeInTheDocument()
  })

  it('renders the "how it works" link', () => {
    render(<Hero />)
    expect(screen.getByText('See how it works →')).toBeInTheDocument()
  })

  it('renders all AI provider pills', () => {
    render(<Hero />)
    expect(screen.getByText('Gemini')).toBeInTheDocument()
    expect(screen.getByText('OpenAI')).toBeInTheDocument()
    expect(screen.getByText('Anthropic')).toBeInTheDocument()
    expect(screen.getByText('Groq')).toBeInTheDocument()
  })

  it('renders the eyebrow badge', () => {
    render(<Hero />)
    expect(screen.getByText(/Powered by Gemini Flash/)).toBeInTheDocument()
  })
})
