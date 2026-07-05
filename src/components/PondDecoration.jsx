const duckConfigs = [
  { id: 'duck-1', x: '12%', y: '22%', scale: 0.88, delay: '0s', duration: '14s', rotate: -4, size: 22 },
  { id: 'duck-2', x: '54%', y: '18%', scale: 1.03, delay: '1.6s', duration: '12s', rotate: 6, size: 28 },
  { id: 'duck-3', x: '24%', y: '58%', scale: 0.95, delay: '0.9s', duration: '10s', rotate: -3, size: 24 },
  { id: 'duck-4', x: '68%', y: '52%', scale: 0.82, delay: '2.2s', duration: '16s', rotate: 4, size: 20 },
  { id: 'duck-5', x: '82%', y: '28%', scale: 1.12, delay: '1.1s', duration: '13s', rotate: -7, size: 30 },
]

function PondDecoration() {
  return (
    <section className="pond-decoration" aria-label="手绘小鸭池塘装饰">
      <div className="pond-canvas">
        <div className="pond-water" />
        <div className="pond-ripples" />
        <div className="pond-grass pond-grass--left">
          <span />
          <span />
          <span />
        </div>
        <div className="pond-grass pond-grass--right">
          <span />
          <span />
          <span />
          <span />
        </div>

        {duckConfigs.map((duck) => (
          <div
            key={duck.id}
            className="pond-duck"
            style={{
              '--duck-x': duck.x,
              '--duck-y': duck.y,
              '--duck-scale': duck.scale,
              '--duck-delay': duck.delay,
              '--duck-duration': duck.duration,
              '--duck-rotate': `${duck.rotate}deg`,
              '--duck-size': `${duck.size}px`,
            }}
          >
            <div className="pond-duck-body" />
            <div className="pond-duck-head" />
            <div className="pond-duck-beak" />
            <div className="pond-duck-wing" />
          </div>
        ))}
      </div>
    </section>
  )
}

export default PondDecoration
