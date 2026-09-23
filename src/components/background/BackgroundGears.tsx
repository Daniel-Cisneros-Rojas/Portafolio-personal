import { useEffect, useRef } from 'react'

const ROTATION_PER_PX = 0.12
const GEAR_SPEEDS = [1, -380 / 220, 380 / 140]

const GEAR_PATH =
  'M 92.39 -38.27 A 100 100 0 0 1 100 0 L 82 0 A 82 82 0 0 1 75.76 31.38 L 92.39 38.27 A 100 100 0 0 1 70.71 70.71 L 57.98 57.98 A 82 82 0 0 1 31.38 75.76 L 38.27 92.39 A 100 100 0 0 1 0 100 L 0 82 A 82 82 0 0 1 -31.38 75.76 L -38.27 92.39 A 100 100 0 0 1 -70.71 70.71 L -57.98 57.98 A 82 82 0 0 1 -75.76 31.38 L -92.39 38.27 A 100 100 0 0 1 -100 0 L -82 0 A 82 82 0 0 1 -75.76 -31.38 L -92.39 -38.27 A 100 100 0 0 1 -70.71 -70.71 L -57.98 -57.98 A 82 82 0 0 1 -31.38 -75.76 L -38.27 -92.39 A 100 100 0 0 1 0 -100 L 0 -82 A 82 82 0 0 1 31.38 -75.76 L 38.27 -92.39 A 100 100 0 0 1 70.71 -70.71 L 57.98 -57.98 A 82 82 0 0 1 75.76 -31.38 L 92.39 -38.27 Z'

export function BackgroundGears() {
  const gearRefs = useRef<(SVGSVGElement | null)[]>([])

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reducedMotion.matches) {
      return
    }

    let rafId = 0

    const applyRotation = () => {
      rafId = 0
      const rotation = window.scrollY * ROTATION_PER_PX
      gearRefs.current.forEach((gear, index) => {
        if (gear) {
          gear.style.transform = `rotate(${rotation * GEAR_SPEEDS[index]}deg)`
        }
      })
    }

    const onScroll = () => {
      if (rafId === 0) {
        rafId = window.requestAnimationFrame(applyRotation)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    applyRotation()

    return () => {
      if (rafId !== 0) {
        window.cancelAnimationFrame(rafId)
      }
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div className="background-gears" aria-hidden="true">
      {[0, 1, 2].map((index) => (
        <svg
          key={index}
          className={`gear gear-${index + 1}`}
          ref={(node) => {
            gearRefs.current[index] = node
          }}
          viewBox="-105 -105 210 210"
          fill="currentColor"
        >
          <path d={GEAR_PATH} fillRule="evenodd" />
          <circle cx="0" cy="0" r="15" fill="var(--color-background)" />
        </svg>
      ))}
    </div>
  )
}