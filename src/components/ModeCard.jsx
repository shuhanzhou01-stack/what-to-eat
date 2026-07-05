function ModeCard({ title, description, imageUrl, onClick }) {
  return (
    <button type="button" className="mode-card" onClick={onClick}>
      <div className="mode-card-art">
        <img src={imageUrl} alt={title} className="mode-card-art-image" />
      </div>
      <div className="mode-card-copy">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <span className="mode-card-action">进入</span>
    </button>
  )
}

export default ModeCard
