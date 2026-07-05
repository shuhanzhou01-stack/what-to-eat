import { useMemo, useState } from 'react'
import { places, restaurants, categories } from '../data/restaurants'
import { doodleUrls } from '../utils/doodleUrls'

const MOOD_OPTIONS = [
  { id: 'adventure', label: '想冒险' },
  { id: 'cozy', label: '想舒适' },
  { id: 'healthy', label: '想健康' },
  { id: 'treat', label: '好好吃一顿' },
]

const BUDGET_OPTIONS = [
  { id: 1, label: '省一点' },
  { id: 2, label: '轻松吃' },
  { id: 3, label: '平衡' },
  { id: 4, label: '好一点' },
  { id: 5, label: '奢侈点' },
]

const moodCategoryMap = {
  adventure: ['japanese', 'hotpot', 'chinese'],
  cozy: ['hotpot', 'japanese', 'light'],
  healthy: ['light', 'japanese', 'chinese'],
  treat: ['hotpot', 'japanese', 'chinese'],
}

function randomPick(items) {
  return items[Math.floor(Math.random() * items.length)]
}

function MoodModePage({ onBack }) {
  const [mood, setMood] = useState('cozy')
  const [budget, setBudget] = useState(3)
  const [result, setResult] = useState(null)

  const titleSticker = doodleUrls[9]
  const pageAccent = doodleUrls[7]

  const options = useMemo(() => {
    const preferredCategories = moodCategoryMap[mood] || []
    return restaurants.filter((restaurant) => preferredCategories.includes(restaurant.categoryId))
  }, [mood])

  const handleRecommend = () => {
    const filtered = options.filter((item) => {
      if (budget <= 2) return ['低', '中'].includes(item.priceLevel)
      if (budget === 3) return ['中', '低'].includes(item.priceLevel)
      if (budget === 4) return ['中'].includes(item.priceLevel)
      return ['中'].includes(item.priceLevel)
    })
    const chosen = randomPick(filtered.length ? filtered : options)
    const place = places.find((item) => item.id === chosen.placeId)
    const category = categories.find((item) => item.id === chosen.categoryId)
    setResult({ place, category, restaurant: chosen })
  }

  return (
    <section className="mode-page">
      <div className="mode-page-decor">
        <img src={pageAccent} className="mode-page-decor-sticker sticker--breathe" alt="" />
      </div>
      <div className="mode-header">
        <button type="button" className="back-link" onClick={onBack}>
          ← 返回首页
        </button>
        <div className="mode-heading-group">
          <p className="mode-kicker">今日食感</p>
          <div className="mode-heading-row">
            <h1>按心情推荐</h1>
            <img src={titleSticker} className="mode-heading-sticker" alt="" />
          </div>
          <p className="mode-intro">按今天的状态和预算，推荐更贴近心情的一餐。</p>
        </div>
      </div>

      <div className="mode-panel mode-panel--split">
        <div className="panel-section">
          <p className="panel-label">今天的状态</p>
          <div className="chip-grid chip-grid--flow">
            {MOOD_OPTIONS.map((option) => (
              <button
                type="button"
                key={option.id}
                className={`chip ${mood === option.id ? 'active' : ''}`}
                onClick={() => setMood(option.id)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="panel-section">
          <p className="panel-label">预算等级</p>
          <div className="budget-row">
            {BUDGET_OPTIONS.map((option) => (
              <button
                type="button"
                key={option.id}
                className={`chip chip--budget ${budget === option.id ? 'active' : ''}`}
                onClick={() => setBudget(option.id)}
              >
                <span>{option.id}</span>
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <button type="button" className="primary-btn mode-action" onClick={handleRecommend}>
          开始推荐
        </button>
      </div>

      <div className="result-panel">
        {result ? (
          <div className="result-card result-card--highlight">
            <img src={doodleUrls[13]} className="result-card-sticker" alt="" />
            <p className="result-label">心情推荐</p>
            <h3>{result.restaurant.name}</h3>
            <div className="result-line">
              <span>心情</span>
              <strong>{MOOD_OPTIONS.find((option) => option.id === mood)?.label}</strong>
            </div>
            <div className="result-line">
              <span>预算</span>
              <strong>{BUDGET_OPTIONS.find((option) => option.id === budget)?.label}</strong>
            </div>
            <div className="result-line">
              <span>商场</span>
              <strong>{result.place?.name}</strong>
            </div>
            <p className="result-copy">{result.restaurant.note}</p>
          </div>
        ) : (
          <div className="empty-state">
            <p>选择你的今日状态与预算，看看适合今天的哪顿饭。</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default MoodModePage
