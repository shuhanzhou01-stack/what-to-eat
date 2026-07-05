function FavoriteList({ favorites, onToggleFavorite }) {
  return (
    <section className="panel side-panel">
      <div className="panel-title-row">
        <h3>收藏</h3>
        <p>想留着以后再看</p>
      </div>
      {favorites.length ? (
        <ul className="favorite-list">
          {favorites.map((restaurant) => (
            <li key={restaurant.id}>
              <button type="button" className="favorite-item" onClick={() => onToggleFavorite(restaurant)}>
                <div>
                  <p className="mini-title">{restaurant.name}</p>
                  <p className="mini-copy">{restaurant.note}</p>
                </div>
                <span className="mini-star">★</span>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="empty-state compact">还没有收藏。</p>
      )}
    </section>
  )
}

export default FavoriteList
