function SlotMachine({ columns, isSpinning }) {
  return (
    <div className="slot-machine">
      {columns.map((column) => (
        <div key={column.title} className={`slot-column ${isSpinning ? 'spinning' : ''}`}>
          <p className="slot-title">{column.title}</p>
          <div className="slot-value">
            <span className="slot-icon">{column.icon}</span>
            <span>{column.value}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SlotMachine
