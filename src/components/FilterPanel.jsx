import { categories, places } from '../data/restaurants'

function FilterPanel({ filters, onFilterChange, onResetFilters }) {
  return (
    <section className="panel filter-panel">
      <div className="panel-title-row">
        <h3>筛选</h3>
        <button type="button" className="text-btn" onClick={onResetFilters}>
          重置
        </button>
      </div>

      <div className="filter-group">
        <label>地点</label>
        <div className="chip-row">
          <button
            type="button"
            className={`chip ${filters.placeId === 'all' ? 'active' : ''}`}
            onClick={() => onFilterChange('placeId', 'all')}
          >
            不限
          </button>
          {places.map((place) => (
            <button
              key={place.id}
              type="button"
              className={`chip ${filters.placeId === place.id ? 'active' : ''}`}
              onClick={() => onFilterChange('placeId', place.id)}
            >
              {place.name}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <label>吃饭方向</label>
        <div className="chip-row">
          <button
            type="button"
            className={`chip ${filters.categoryId === 'all' ? 'active' : ''}`}
            onClick={() => onFilterChange('categoryId', 'all')}
          >
            不限
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              className={`chip ${filters.categoryId === category.id ? 'active' : ''}`}
              onClick={() => onFilterChange('categoryId', category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FilterPanel
