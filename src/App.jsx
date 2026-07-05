import { useEffect, useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import LoadingScreen from './components/LoadingScreen'
import PickerModal from './components/PickerModal'
import PlaceGrid from './components/PlaceGrid'
import { places } from './data/restaurants'
import { pickCategory, pickPlace, pickRestaurant, getRestaurantHint } from './utils/restaurantLogic'

const STORAGE_KEYS = {
  history: 'what-to-eat-history',
  favorites: 'what-to-eat-favorites',
}

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPlaceId, setSelectedPlaceId] = useState(null)
  const [result, setResult] = useState({ place: null, category: null, restaurant: null, hint: '' })
  const [history, setHistory] = useState([])
  const [favorites, setFavorites] = useState([])
  const [isBooting, setIsBooting] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSpinning, setIsSpinning] = useState(false)
  const [lastRestaurantId, setLastRestaurantId] = useState(null)
  const [activeSection, setActiveSection] = useState('places')

  useEffect(() => {
    const savedHistory = window.localStorage.getItem(STORAGE_KEYS.history)
    const savedFavorites = window.localStorage.getItem(STORAGE_KEYS.favorites)

    if (savedHistory) {
      setHistory(JSON.parse(savedHistory))
    }
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEYS.history, JSON.stringify(history))
  }, [history])

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(favorites))
  }, [favorites])

  const filteredPlaces = places.filter((place) =>
    place.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const recentHistory = history.slice(0, 3)
  const recentFavorites = favorites.slice(0, 3)

  const handleOpenModal = () => {
    setActiveSection('places')
    setIsModalOpen(true)
    setIsSpinning(false)
  }

  const handleDecide = () => {
    setIsSpinning(true)

    window.setTimeout(() => {
      const place = pickPlace({
        selectedPlace: selectedPlaceId,
        selectedCategory: 'all',
      })
      const category = pickCategory({
        selectedCategory: 'all',
        selectedPlace: place?.id ?? null,
      })
      const hint = getRestaurantHint({ placeId: place?.id, categoryId: category?.id })

      setResult({ place, category, restaurant: null, hint: hint || '' })
      setHistory((prev) => [{ place, category, restaurant: null, hint }, ...prev].slice(0, 5))
      setIsSpinning(false)
      setIsModalOpen(true)
    }, 750)
  }

  const handleSpecificRestaurant = () => {
    if (!result.place || !result.category) {
      return
    }

    const restaurant = pickRestaurant({
      placeId: result.place.id,
      categoryId: result.category.id,
      lastRestaurantId,
    })

    if (restaurant) {
      setLastRestaurantId(restaurant.id)
      setResult((prev) => ({ ...prev, restaurant }))
      setHistory((prev) => [{ place: result.place, category: result.category, restaurant, hint: '' }, ...prev].slice(0, 5))
      return
    }

    setResult((prev) => ({
      ...prev,
      restaurant: null,
      hint: getRestaurantHint({ placeId: result.place.id, categoryId: result.category.id }) || '',
    }))
  }

  const handleToggleFavorite = (restaurant = result.restaurant) => {
    if (!restaurant) {
      return
    }

    setFavorites((prev) => {
      const exists = prev.some((item) => item.id === restaurant.id)
      if (exists) {
        return prev.filter((item) => item.id !== restaurant.id)
      }
      return [restaurant, ...prev]
    })
  }

  const handleSectionSelect = (sectionId) => {
    setActiveSection(sectionId)
    if (sectionId === 'picker') {
      handleOpenModal()
      return
    }

    const targetId = sectionId === 'history' ? 'recent-notes' : sectionId === 'favorites' ? 'favorite-notes' : 'place-grid'
    const target = document.getElementById(targetId)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const isFavorite = result.restaurant
    ? favorites.some((restaurant) => restaurant.id === result.restaurant.id)
    : false

  if (isBooting) {
    return <LoadingScreen onComplete={() => setIsBooting(false)} />
  }

  return (
    <div className="app-shell">
      <Sidebar
        activeSection={activeSection}
        onSelectSection={handleSectionSelect}
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
        onStart={handleOpenModal}
      />

      <main className="app-main">
        <div className="library-top">
          <div className="library-copy">
            <span className="page-label">Food Library</span>
            <h1>吃饭地点</h1>
            <p>轻盈的地点书库，让你在苏州热门消费场所之间自由翻阅。</p>
          </div>
          <button type="button" className="start-button" onClick={handleOpenModal}>
            开始抽取
          </button>
        </div>

        <section className="place-library" id="place-grid">
          <PlaceGrid
            places={filteredPlaces}
            selectedPlace={selectedPlaceId}
            searchQuery={searchQuery}
            onSelectPlace={(id) => setSelectedPlaceId(id)}
          />
        </section>

        <section className="home-summary">
          <div className="mini-panel" id="recent-notes">
            <div className="panel-heading">
              <p>最近记录</p>
              <span>{recentHistory.length}/3</span>
            </div>
            {recentHistory.length ? (
              <div className="mini-list">
                {recentHistory.map((item, index) => (
                  <div key={`${item.place?.id}-${index}`} className="mini-note">
                    <p className="mini-note-title">{item.place?.name || '地点待定'}</p>
                    <p>{item.category?.label || '方向待定'}{item.restaurant ? ` · ${item.restaurant.name}` : ''}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mini-empty">还没有抽取记录，点击开始抽取开始收集。</p>
            )}
          </div>

          <div className="mini-panel" id="favorite-notes">
            <div className="panel-heading">
              <p>收藏</p>
              <span>{recentFavorites.length}/3</span>
            </div>
            {recentFavorites.length ? (
              <div className="mini-list">
                {recentFavorites.map((restaurant) => (
                  <div key={restaurant.id} className="mini-note">
                    <p className="mini-note-title">{restaurant.name}</p>
                    <p>{restaurant.note}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mini-empty">你还没有收藏任何店铺。</p>
            )}
          </div>
        </section>
      </main>

      <PickerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSpin={handleDecide}
        onRestaurant={handleSpecificRestaurant}
        result={result}
        isSpinning={isSpinning}
        isFavorite={isFavorite}
        onToggleFavorite={handleToggleFavorite}
      />
    </div>
  )
}

export default App
