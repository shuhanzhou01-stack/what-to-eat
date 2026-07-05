function ResultCard({ result, onToggleFavorite, isFavorite }) {
  return (
    <section className="result-card">
      <p className="result-label">今天可以去</p>
      <h3>{result.place?.name || '尚未抽取'}</h3>
      <div className="result-line">
        <span>吃饭方向</span>
        <strong>{result.category?.label || '等待抽取'}</strong>
      </div>
      {result.restaurant ? (
        <div className="result-line">
          <span>具体到店</span>
          <strong>{result.restaurant.name}</strong>
        </div>
      ) : null}
      <p className="result-copy">
        {result.restaurant
          ? result.restaurant.note
          : result.hint || '这个选择比较稳，不想纠结的话可以先按这个方向走。'}
      </p>
      <div className="result-tags">
        {result.restaurant?.tags.map((tag) => (
          <span key={tag} className="result-pill">
            {tag}
          </span>
        ))}
      </div>
      <div className="result-actions">
        <button type="button" className="secondary-btn" onClick={onToggleFavorite} disabled={!result.restaurant}>
          {isFavorite ? '取消收藏' : '收藏'}
        </button>
      </div>
    </section>
  )
}

export default ResultCard
