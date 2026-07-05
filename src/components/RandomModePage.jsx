import { useState } from 'react'
import { places, restaurants, categories } from '../data/restaurants'
import { doodleUrls } from '../utils/doodleUrls'

function pickRandom(items) {
  return items[Math.floor(Math.random() * items.length)]
}

function RandomModePage({ onBack }) {
  const [result, setResult] = useState(null)

  const handleDraw = () => {
    const restaurant = pickRandom(restaurants)
    const place = places.find((item) => item.id === restaurant.placeId)
    const category = categories.find((item) => item.id === restaurant.categoryId)
    setResult({ place, category, restaurant })
  }

  const titleSticker = doodleUrls[4]
  const pageAccent = doodleUrls[10]

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
          <p className="mode-kicker">随缘开吃</p>
          <div className="mode-heading-row">
            <h1>完全随机</h1>
            <img src={titleSticker} className="mode-heading-sticker" alt="" />
          </div>
          <p className="mode-intro">完全交给运气，随机决定今天的去处。</p>
        </div>
      </div>

      <div className="mode-panel">
        <div className="mode-panel-copy">
          <p className="panel-label">随机的温柔方式</p>
          <p>今天不必纠结，听一听内心的直觉，让小概率的惊喜替你决定。</p>
        </div>
        <button type="button" className="primary-btn mode-action" onClick={handleDraw}>
          开始随机
        </button>
      </div>

      <div className="result-panel">
        {result ? (
          <div className="result-card">
            <p className="result-label">今日随机结果</p>
            <h3>{result.restaurant.name}</h3>
            <div className="result-line">
              <span>商场</span>
              <strong>{result.place?.name || '苏州中心'}</strong>
            </div>
            <div className="result-line">
              <span>类型</span>
              <strong>{result.category?.label || '日料'}</strong>
            </div>
            <div className="result-line">
              <span>店铺</span>
              <strong>{result.restaurant.name}</strong>
            </div>
            <p className="result-copy">{result.restaurant.note}</p>
            <button type="button" className="secondary-btn" onClick={handleDraw}>
              再抽一次
            </button>
          </div>
        ) : (
          <div className="empty-state">
            <p>你可以点“开始随机”，然后看今日幸运餐厅的出现。</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default RandomModePage
