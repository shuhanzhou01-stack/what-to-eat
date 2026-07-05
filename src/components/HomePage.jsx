import ModeCard from './ModeCard'
import randomModeImage from '../assets/illustrations/mode-random.png'
import directionModeImage from '../assets/illustrations/mode-direction.png'
import moodModeImage from '../assets/illustrations/mode-mood.png'
import cornerRunningImage from '../assets/illustrations/corner-running.png'

const MODE_ITEMS = [
  {
    id: 'random',
    title: '随缘开吃',
    description: '完全交给运气，随机决定今天的去处。',
    imageUrl: randomModeImage,
  },
  {
    id: 'guided',
    title: '定向随机',
    description: '先定一个方向，再帮你抽出结果。',
    imageUrl: directionModeImage,
  },
  {
    id: 'mood',
    title: '今日食感',
    description: '按今天的状态和预算，推荐更贴近心情的一餐。',
    imageUrl: moodModeImage,
  },
]

function HomePage({ onSelectMode }) {
  return (
    <section className="home-page">
      <div className="home-grid">
        <div className="home-left">
          <div className="home-intro">
            <p className="home-kicker">轻手账式美味决定</p>
            <h1>今天吃什么</h1>
            <p className="home-subtitle">Every meal is an adventure 🍽️</p>
            <p className="home-description">三种方式，帮你在苏州日常里决定今天吃哪一餐。</p>
          </div>

          <div className="home-note-panel">
            <p className="home-note-copy">在这套温柔手账风中，选一个今天最想尝试的方向。</p>
          </div>

          <div className="mode-grid">
            {MODE_ITEMS.map((mode) => (
              <ModeCard
                key={mode.id}
                title={mode.title}
                description={mode.description}
                imageUrl={mode.imageUrl}
                onClick={() => onSelectMode(mode.id)}
              />
            ))}
          </div>
        </div>

        <div className="home-right">
          <div className="home-right-illustration">
            <img src={cornerRunningImage} alt="Running illustration" className="right-illustration-img" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomePage
