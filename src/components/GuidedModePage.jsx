import { useMemo, useState } from 'react'
import { places, restaurants, categories } from '../data/restaurants'
import { doodleUrls } from '../utils/doodleUrls'

const PLACE_OPTIONS = [
  { id: 'all', label: '不限' },
  { id: 'suzhou-center', label: '苏州中心' },
  { id: 'eslite', label: '诚品生活' },
  { id: 'jinguang', label: '久光百货' },
  { id: 'yuanrong', label: '圆融时代广场' },
  { id: 'longhu-shishan', label: '龙湖狮山天街' },
  { id: 'ligongdi', label: '李公堤' },
  { id: 'incity', label: '印象城' },
  { id: 'aeon-mall', label: '永旺梦乐城' },
  { id: 'hanlin', label: '翰林' },
  { id: 'mixc-world', label: '万象天地' },
]

const TYPE_OPTIONS = [
  { id: 'all', label: '不限' },
  { id: 'japanese', label: '日料' },
  { id: 'hotpot', label: '火锅' },
  { id: 'chinese', label: '中餐' },
  { id: 'light', label: '咖啡简餐' },
]

function randomPick(items) {
  return items[Math.floor(Math.random() * items.length)]
}

function GuidedModePage({ onBack }) {
  const [placeId, setPlaceId] = useState('all')
  const [categoryId, setCategoryId] = useState('all')
  const [result, setResult] = useState(null)

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((item) => {
      const placeMatch = placeId === 'all' || item.placeId === placeId
      const categoryMatch = categoryId === 'all' || item.categoryId === categoryId
      return placeMatch && categoryMatch
    })
  }, [placeId, categoryId])

  const titleSticker = doodleUrls[11]
  const pageAccent = doodleUrls[14]

  const handlePick = () => {
    const chosen = randomPick(filteredRestaurants.length ? filteredRestaurants : restaurants)
    const place = places.find((item) => item.id === chosen.placeId)
    const category = categories.find((item) => item.id === chosen.categoryId)
    setResult({ place, category, restaurant: chosen })
  }

  return (
    <section className="mode-page">
      <div className="mode-page-decor">
        <img src={pageAccent} className="mode-page-decor-sticker sticker--float" alt="" />
      </div>
      <div className="mode-header">
        <button type="button" className="back-link" onClick={onBack}>
          ← 返回首页
        </button>
        <div className="mode-heading-group">
          <p className="mode-kicker">定向随机</p>
          <div className="mode-heading-row">
            <h1>先定一个方向</h1>
            <img src={titleSticker} className="mode-heading-sticker" alt="" />
          </div>
          <p className="mode-intro">先给一点方向，再帮你随机出结果。</p>
        </div>
      </div>

      <div className="mode-panel mode-panel--split">
        <div className="panel-section">
          <p className="panel-label">商场选择</p>
          <div className="chip-grid">
            {PLACE_OPTIONS.map((option) => (
              <button
                type="button"
                key={option.id}
                className={`chip ${placeId === option.id ? 'active' : ''}`}
                onClick={() => setPlaceId(option.id)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
        <div className="panel-section">
          <p className="panel-label">类型选择</p>
          <div className="chip-grid">
            {TYPE_OPTIONS.map((option) => (
              <button
                type="button"
                key={option.id}
                className={`chip ${categoryId === option.id ? 'active' : ''}`}
                onClick={() => setCategoryId(option.id)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
        <button type="button" className="primary-btn mode-action" onClick={handlePick}>
          开始抽取
        </button>
      </div>

      <div className="result-panel">
        {result ? (
          <div className="result-card result-card--highlight">
            <img src={doodleUrls[6]} className="result-card-sticker" alt="" />
            <p className="result-label">推荐结果</p>
            <h3>{result.restaurant.name}</h3>
            <div className="result-line">
              <span>商场</span>
              <strong>{result.place?.name}</strong>
            </div>
            <div className="result-line">
              <span>类型</span>
              <strong>{result.category?.label}</strong>
            </div>
            <div className="result-line">
              <span>预算</span>
              <strong>{result.restaurant.priceLevel}</strong>
            </div>
            <p className="result-copy">{result.restaurant.note}</p>
          </div>
        ) : (
          <div className="empty-state">
            <p>请先选择一个商场和/或类型，然后点“开始抽取”查看推荐。</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default GuidedModePage
