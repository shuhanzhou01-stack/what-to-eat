import { useEffect, useState } from 'react'
import doodle01 from '../assets/doodles/doodle-01.svg'
import doodle02 from '../assets/doodles/doodle-02.svg'
import doodle03 from '../assets/doodles/doodle-03.svg'
import doodle04 from '../assets/doodles/doodle-04.svg'
import doodle05 from '../assets/doodles/doodle-05.svg'
import doodle06 from '../assets/doodles/doodle-06.svg'
import doodle07 from '../assets/doodles/doodle-07.svg'
import doodle08 from '../assets/doodles/doodle-08.svg'

const DOODLE_ORDER = [
  { src: doodle01, className: 'loading-doodle-01' },
  { src: doodle02, className: 'loading-doodle-02' },
  { src: doodle03, className: 'loading-doodle-03' },
  { src: doodle04, className: 'loading-doodle-04' },
  { src: doodle05, className: 'loading-doodle-05' },
  { src: doodle06, className: 'loading-doodle-06' },
  { src: doodle07, className: 'loading-doodle-07' },
  { src: doodle08, className: 'loading-doodle-08' },
]

function LoadingScreen({ onComplete }) {
  const [isFading, setIsFading] = useState(false)

  useEffect(() => {
    const fadeTimer = window.setTimeout(() => setIsFading(true), 3200)
    const doneTimer = window.setTimeout(() => {
      onComplete?.()
    }, 3520)

    return () => {
      window.clearTimeout(fadeTimer)
      window.clearTimeout(doneTimer)
    }
  }, [onComplete])

  return (
    <div className={`loading-viewport ${isFading ? 'loading-fade' : ''}`}>
      <div className="loading-screen">
        <div className="loading-center">
          <div className="loading-paper">
            <div className="loading-header">
              <p className="loading-eyebrow">SUZHOU FOOD PICKER</p>
              <div>
                <h1 className="loading-title">今天吃什么？</h1>
                <p className="loading-subtitle">先选一个方向。</p>
              </div>
            </div>

            <div className="loading-progress">
              <div className="loading-progress-bar" />
            </div>
          </div>
        </div>

        <div className="loading-doodles">
          {DOODLE_ORDER.map((item, index) => (
            <img
              key={index}
              src={item.src}
              alt="doodle"
              className={`loading-doodle ${item.className}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen
