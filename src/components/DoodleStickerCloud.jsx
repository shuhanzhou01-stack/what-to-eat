const doodleModules = import.meta.glob('../assets/doodles/*.svg', {
  eager: true,
  import: 'default',
  query: '?url',
})

const doodleUrls = Object.values(doodleModules)

const stickerLayout = [
  { top: '6%', left: '72%', size: 68, rotate: -4, animation: 'float', delay: '0s', duration: '7.8s', opacity: 0.84 },
  { top: '22%', left: '86%', size: 48, rotate: 8, animation: 'wiggle', delay: '0.9s', duration: '6.2s', opacity: 0.78 },
  { top: '44%', left: '68%', size: 54, rotate: -3, animation: 'breathe', delay: '0.7s', duration: '8.4s', opacity: 0.82 },
  { top: '72%', left: '78%', size: 42, rotate: 3, animation: 'float', delay: '1.5s', duration: '6.8s', opacity: 0.76 },
  { top: '52%', left: '92%', size: 34, rotate: -2, animation: 'wiggle', delay: '2.1s', duration: '7.2s', opacity: 0.72 },
  { top: '12%', left: '58%', size: 48, rotate: 5, animation: 'breathe', delay: '1.1s', duration: '7.4s', opacity: 0.82 },
  { top: '34%', left: '50%', size: 68, rotate: -6, animation: 'float', delay: '0.2s', duration: '8.1s', opacity: 0.84 },
  { top: '80%', left: '58%', size: 40, rotate: 1, animation: 'wiggle', delay: '0s', duration: '7.6s', opacity: 0.74 },
  { top: '8%', left: '92%', size: 34, rotate: 4, animation: 'breathe', delay: '2.6s', duration: '6.6s', opacity: 0.7 },
  { top: '64%', left: '40%', size: 54, rotate: -5, animation: 'float', delay: '1.2s', duration: '8.2s', opacity: 0.8 },
  { top: '18%', left: '24%', size: 48, rotate: 2, animation: 'wiggle', delay: '0.3s', duration: '6.9s', opacity: 0.76 },
  { top: '84%', left: '18%', size: 34, rotate: -3, animation: 'breathe', delay: '1.8s', duration: '7.6s', opacity: 0.72 },
  { top: '42%', left: '10%', size: 34, rotate: 5, animation: 'float', delay: '0.8s', duration: '7.4s', opacity: 0.7 },
  { top: '70%', left: '22%', size: 42, rotate: -2, animation: 'wiggle', delay: '2.4s', duration: '8.0s', opacity: 0.78 },
]

function DoodleStickerCloud() {
  return (
    <div className="doodle-cloud" aria-hidden="true">
      {stickerLayout.map((item, index) => {
        const url = doodleUrls[index % doodleUrls.length]
        return (
          <img
            key={`sticker-${index}`}
            className={`sticker sticker--${item.animation}`}
            src={url}
            alt=""
            style={{
              top: item.top,
              left: item.left,
              width: `${item.size}px`,
              opacity: item.opacity,
              transform: `rotate(${item.rotate}deg)`,
              animationDelay: item.delay,
              animationDuration: item.duration,
            }}
          />
        )
      })}
    </div>
  )
}

export default DoodleStickerCloud
