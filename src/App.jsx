import { useEffect, useState } from 'react'
import './App.css'
import LoadingScreen from './components/LoadingScreen'
import HomePage from './components/HomePage'
import RandomModePage from './components/RandomModePage'
import GuidedModePage from './components/GuidedModePage'
import MoodModePage from './components/MoodModePage'

function App() {
  const [isBooting, setIsBooting] = useState(true)
  const [activePage, setActivePage] = useState('home')

  if (isBooting) {
    return <LoadingScreen onComplete={() => setIsBooting(false)} />
  }

  return (
    <div className="app-frame">
      <header className="app-header">
        <div>
          <p className="app-brand">今天吃什么</p>
          <p className="app-tagline">轻柔手账风的美味探索空间</p>
        </div>
        <nav className="page-nav" aria-label="主页面导航">
          <button type="button" className={activePage === 'home' ? 'nav-link active' : 'nav-link'} onClick={() => setActivePage('home')}>
            首页
          </button>
          <button type="button" className={activePage === 'random' ? 'nav-link active' : 'nav-link'} onClick={() => setActivePage('random')}>
            随缘开吃
          </button>
          <button type="button" className={activePage === 'guided' ? 'nav-link active' : 'nav-link'} onClick={() => setActivePage('guided')}>
            定向随机
          </button>
          <button type="button" className={activePage === 'mood' ? 'nav-link active' : 'nav-link'} onClick={() => setActivePage('mood')}>
            今日食感
          </button>
        </nav>
      </header>

      <main className="app-content">
        {activePage === 'home' && <HomePage onSelectMode={setActivePage} />}
        {activePage === 'random' && <RandomModePage onBack={() => setActivePage('home')} />}
        {activePage === 'guided' && <GuidedModePage onBack={() => setActivePage('home')} />}
        {activePage === 'mood' && <MoodModePage onBack={() => setActivePage('home')} />}
      </main>
    </div>
  )
}

export default App
