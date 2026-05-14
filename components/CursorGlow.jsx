'use client'
import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let raf
    let cx = window.innerWidth / 2
    let cy = window.innerHeight / 2
    let tx = cx, ty = cy

    const onMove = (e) => { tx = e.clientX; ty = e.clientY }
    window.addEventListener('mousemove', onMove, { passive: true })

    const tick = () => {
      cx += (tx - cx) * 0.06
      cy += (ty - cy) * 0.06
      el.style.transform = `translate(${cx - 250}px, ${cy - 250}px)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <div ref={ref} className="cursor-glow" aria-hidden="true" />
}
