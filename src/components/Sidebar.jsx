import DoodleIcon from './DoodleIcon'

const navItems = [
  { id: 'places', label: '全部地点' },
  { id: 'picker', label: '开始抽取' },
  { id: 'history', label: '最近记录' },
  { id: 'favorites', label: '收藏' },
]

function Sidebar({ activeSection, onSelectSection, searchQuery, onSearch, onStart }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="sidebar-icon">
          <DoodleIcon type="book" />
        </span>
        <div>
          <p className="sidebar-title">今天吃什么</p>
          <p className="sidebar-note">轻量地点书库</p>
        </div>
      </div>

      <label className="search-label">
        <span>搜索地点</span>
        <input
          type="text"
          value={searchQuery}
          onChange={(event) => onSearch(event.target.value)}
          placeholder="搜索地点"
          className="search-input"
        />
      </label>

      <div className="sidebar-actions">
        <button type="button" className="start-action" onClick={onStart}>
          开始抽取
        </button>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
            onClick={() => onSelectSection(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="sidebar-foot">
        <DoodleIcon type="coffee" className="sidebar-doodle" />
      </div>
    </aside>
  )
}

export default Sidebar
