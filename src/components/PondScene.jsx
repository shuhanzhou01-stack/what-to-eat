import { useState } from 'react'

const fishShapes = [
  { id: 'fish-1', top: '16%', left: '20%', scale: 1, rotate: -10 },
  { id: 'fish-2', top: '36%', left: '68%', scale: 0.92, rotate: 12 },
  { id: 'fish-3', top: '62%', left: '32%', scale: 0.88, rotate: -6 },
  { id: 'fish-4', top: '52%', left: '54%', scale: 1.05, rotate: 8 },
]

function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value))
}

function PondScene() {
  const [pointer, setPointer] = useState({ x: 0.5, y: 0.5 })

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = clamp((event.clientX - rect.left) / rect.width)
    const y = clamp((event.clientY - rect.top) / rect.height)
    setPointer({ x, y })
  }

  const handleMouseLeave = () => {
    setPointer({ x: 0.5, y: 0.5 })
  }

  return (
    <section className="pond-card" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <div className="pond-card-inner">
        <div className="pond-water" />
        {fishShapes.map((fish, index) => {
          const offsetX = (pointer.x - 0.5) * 12 * (index % 2 === 0 ? 1 : -1)
          const offsetY = (pointer.y - 0.5) * 10 * (index % 3 === 0 ? 1 : -1)
          const rotation = fish.rotate + (pointer.x - 0.5) * 8

          return (
            <div
              key={fish.id}
              className="pond-fish"
              style={{
                top: fish.top,
                left: fish.left,
                transform: `translate(${offsetX}px, ${offsetY}px) rotate(${rotation}deg) scale(${fish.scale})`,
              }}
            >
              <span className="pond-fish-body" />
              <span className="pond-fish-tail" />
            </div>
          )
        })}
      </div>
      <div className="pond-caption">
        <p>水面轻摇</p>
        <span>小鱼们会悄悄随着你的手指游动。</span>
      </div>
    </section>
  )
}

export default PondScene
