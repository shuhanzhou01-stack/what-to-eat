function HistoryList({ history, onClear }) {
  return (
    <section className="panel side-panel">
      <div className="panel-title-row">
        <h3>最近记录</h3>
        <button type="button" className="text-btn" onClick={onClear}>
          清空
        </button>
      </div>
      {history.length ? (
        <ul className="history-list">
          {history.map((item, index) => {
            const placeLabel = item.place?.name || '未选择'
            const categoryLabel = item.category?.label || '未选择'
            const restaurantLabel = item.restaurant?.name || ''

            return (
              <li key={`${placeLabel}-${categoryLabel}-${index}`}>
                <div>
                  <p className="mini-title">{placeLabel}</p>
                  <p className="mini-copy">{categoryLabel}</p>
                </div>
                <span className="mini-badge">{restaurantLabel || '方向'}</span>
              </li>
            )
          })}
        </ul>
      ) : (
        <p className="empty-state compact">还没有记录。</p>
      )}
    </section>
  )
}

export default HistoryList
