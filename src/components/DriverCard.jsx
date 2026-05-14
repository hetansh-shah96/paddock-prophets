import { TEAMS } from '../data/drivers'

export function DriverCardSmall({ driver, onDoubleClick, dimmed }) {
  const team = TEAMS[driver.team]
  return (
    <div
      className={`flex items-center gap-2 bg-neutral-800 rounded-md px-2 py-1.5 transition-opacity ${dimmed ? 'opacity-40' : 'opacity-100'} ${onDoubleClick ? 'cursor-pointer hover:bg-neutral-700' : ''}`}
      style={{ borderLeft: `3px solid ${team.color}` }}
      onDoubleClick={onDoubleClick}
      title={onDoubleClick ? 'Double-click to remove' : undefined}
    >
      <span className="text-base leading-none">{driver.emoji}</span>
      <span className="text-sm font-semibold text-white">{driver.name}</span>
      <span className="text-xs text-neutral-400 ml-auto">#{driver.number}</span>
    </div>
  )
}

export function DriverCardDraggable({ driver, placedInColumns }) {
  const team = TEAMS[driver.team]
  const placedCount = placedInColumns.length

  function onDragStart(e) {
    e.dataTransfer.setData('driverId', driver.id)
    e.dataTransfer.effectAllowed = 'copy'
  }

  return (
    <div
      draggable
      onDragStart={onDragStart}
      className="flex items-center gap-2 bg-neutral-800 rounded-md px-2 py-1.5 cursor-grab active:cursor-grabbing hover:bg-neutral-700 transition-colors select-none"
      style={{ borderLeft: `3px solid ${team.color}` }}
    >
      <span className="text-sm leading-none">{driver.emoji}</span>
      <span className="text-sm font-medium text-white">{driver.name}</span>
      <span className="text-xs text-neutral-500 ml-auto">#{driver.number}</span>
      {placedCount > 0 && (
        <span
          className="text-xs bg-neutral-700 text-neutral-300 rounded-full px-1.5 py-0.5 leading-none"
          title={`Placed in ${placedCount} column(s)`}
        >
          {placedCount}
        </span>
      )}
    </div>
  )
}
