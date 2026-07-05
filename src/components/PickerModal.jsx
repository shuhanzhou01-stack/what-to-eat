import { useState } from 'react'
import SlotMachine from './SlotMachine'

function PickerModal({ isOpen, onClose, onSpin, onRestaurant, result, isSpinning, isFavorite, onToggleFavorite }) {
  const [showFilters, setShowFilters] = useState(false)

  if (!isOpen) {
    return null
  }

  const columns = [
    { title: '地点', icon: '地点', value: result.place?.name || '等待抽取' },
    { title: '吃饭方向', icon: '方向', value: result.category?.label || '等待抽取' },
    { title: '结果', icon: '结果', value: result.restaurant?.name || '等待抽取' },
  ]

  return (
    <div className="modal-backdrop">
      <div className="picker-modal">
        <div className="modal-head">
          <div>
            <p className="modal-eyebrow">开始抽取</p>
            <h2>先得到一个地点和吃饭方向</h2>
          </div>
          <button type="button" className="close-btn" onClick={onClose}>
            关闭
          </button>
        </div>

        <div className="filter-summary" onClick={() => setShowFilters((prev) => !prev)}>
          <span>筛选条件</span>
          <span>{showFilters ? '收起' : '展开'}</span>
        </div>

        {showFilters && (
          <div className="filter-chip-row modal-filters">
            <button type="button" className="filter-chip">地点</button>
            <button type="button" className="filter-chip">用餐时间</button>
            <button type="button" className="filter-chip">场景</button>
            <button type="button" className="filter-chip">预算</button>
          </div>
        )}

        <SlotMachine columns={columns} isSpinning={isSpinning} />

        <p className="modal-note">抽取结果会在此显示，结果会根据已选地点智能生成方向与门店建议。</p>

        <div className="modal-actions">
          <button type="button" className="primary-btn" onClick={onSpin}>
            {result.place ? '再抽一次' : '开始抽取'}
          </button>
          <button type="button" className="secondary-btn" onClick={onRestaurant} disabled={!result.place}>
            具体到店
          </button>
          <button type="button" className="ghost-btn" onClick={onToggleFavorite} disabled={!result.restaurant}>
            {isFavorite ? '已收藏' : '收藏'}
          </button>
          <button type="button" className="close-secondary" onClick={onClose}>
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

export default PickerModal
