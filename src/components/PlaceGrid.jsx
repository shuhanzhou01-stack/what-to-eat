import DoodleIcon from './DoodleIcon'

const placeMeta = {
  'suzhou-center': { label: '苏州中心', subtitle: '购物与餐饮', icons: ['shopping', 'bowl'] },
  eslite: { label: '诚品生活', subtitle: '书与咖啡', icons: ['book', 'coffee'] },
  jinguang: { label: '久光百货', subtitle: '轻奢与甜点', icons: ['cake'] },
  yuanrong: { label: '圆融时代广场', subtitle: '火锅与烤肉', icons: ['hotpot'] },
  'longhu-shishan': { label: '龙湖狮山天街', subtitle: '咖啡与街头小吃', icons: ['coffee', 'burger'] },
  ligongdi: { label: '李公堤', subtitle: '河畔漫步', icons: ['wave', 'cup'] },
  incity: { label: '印象城', subtitle: '家庭与快餐', icons: ['bowl', 'fork'] },
  'aeon-mall': { label: '永旺梦乐城', subtitle: '大型购物中心', icons: ['shopping'] },
  hanlin: { label: '翰林', subtitle: '学生聚餐', icons: ['bowl', 'chopsticks'] },
  'mixc-world': { label: '万象天地', subtitle: '潮流与美食', icons: ['sushi', 'coffee'] },
}

function PlaceGrid({ places, selectedPlace, searchQuery, onSelectPlace }) {
  const visiblePlaces = places.filter((place) => {
    const text = `${place.name} ${placeMeta[place.id]?.subtitle || ''}`.toLowerCase()
    return text.includes(searchQuery.toLowerCase())
  })

  return (
    <section className="place-grid">
      {visiblePlaces.map((place) => {
        const meta = placeMeta[place.id] || { label: '', subtitle: '', icons: ['book'] }
        const isActive = selectedPlace === place.id

        return (
          <button
            key={place.id}
            type="button"
            className={`place-card ${isActive ? 'active' : ''}`}
            onClick={() => onSelectPlace(place.id)}
          >
            <div className="place-card-art">
              <div className="place-card-art-inner">
                {meta.icons.map((icon) => (
                  <DoodleIcon key={icon} type={icon} className="place-card-icon" />
                ))}
              </div>
            </div>
            <div className="place-card-body">
              <p className="place-card-name">{meta.label}</p>
              <p className="place-card-note">{meta.subtitle}</p>
            </div>
          </button>
        )
      })}
    </section>
  )
}

export default PlaceGrid
