function FoodCard({ result, isLoading, onToggleFavorite, isFavorite, onDecide, onSpecificRestaurant }) {
  const hasDecision = result.place && result.category
  const slotIconMap = {
    place: '📍',
    category: '🍽️',
    restaurant: '🍣',
  }

  return (
    <section className={`food-card ${isLoading ? 'is-loading' : ''}`}>
      <div className="card-top">
        <div>
          <p className="eyebrow">今日推荐</p>
          <h2>{hasDecision ? '今天可以去' : '先来定一个方向'}</h2>
        </div>
        <button
          type="button"
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={onToggleFavorite}
          disabled={!result.restaurant}
          aria-label={isFavorite ? '取消收藏' : '收藏'}
        >
          {isFavorite ? '★' : '☆'}
        </button>
      </div>

      <div className="slot-machine">
        <div className={`slot-column ${isLoading ? 'spinning' : ''}`}>
          <p className="slot-title">地点</p>
          <div className="slot-body">
            <span className="slot-icon">{slotIconMap.place}</span>
            <strong>{result.place?.name || '先选一个'}</strong>
          </div>
        </div>

        <div className={`slot-column ${isLoading ? 'spinning' : ''}`}>
          <p className="slot-title">吃饭方向</p>
          <div className="slot-body">
            <span className="slot-icon">{slotIconMap.category}</span>
            <strong>{result.category?.label || '先给方向'}</strong>
          </div>
        </div>

        <div className={`slot-column ${isLoading ? 'spinning' : ''}`}>
          <p className="slot-title">结果</p>
          <div className="slot-body">
            <span className="slot-icon">{slotIconMap.restaurant}</span>
            <strong>{result.restaurant?.name || '再抽一家店'}</strong>
          </div>
        </div>
      </div>

      {hasDecision ? (
        <div className="result-card">
          <div className="result-card-head">
            <div>
              <p className="result-card-title">今天可以去</p>
              <h3>{result.place?.name}</h3>
            </div>
            <span className="result-icon">🍜</span>
          </div>

          <p className="result-card-copy">
            {result.restaurant
              ? `${result.category?.label} / ${result.restaurant.name}`
              : '想具体一点，可以再抽一家店。'}
          </p>

          {result.restaurant ? (
            <div className="food-meta">
              <span className="pill">{result.restaurant.priceLevel} 价位</span>
              {result.restaurant.tags.map((tag) => (
                <span key={tag} className="pill subtle">
                  {tag}
                </span>
              ))}
            </div>
          ) : (
            <p className="empty-state">{result.hint || '这个选择比较稳。'}</p>
          )}

          <div className="result-actions">
            <button type="button" className="primary-btn" onClick={onDecide}>
              {result.place ? '再抽一次' : '开始抽取'}
            </button>
            <button type="button" className="secondary-btn" onClick={onSpecificRestaurant}>
              具体到店
            </button>
            <button type="button" className="ghost-btn" onClick={onToggleFavorite} disabled={!result.restaurant}>
              收藏这次
            </button>
          </div>
        </div>
      ) : (
        <p className="empty-state">先点一下「开始抽取」，就会给你一个更稳的方向。</p>
      )}
    </section>
  )
}

export default FoodCard
