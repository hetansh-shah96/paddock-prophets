import { useState } from 'react'
import { DriverCardSmall } from './DriverCard'
import { getDriver } from '../data/drivers'

const POS_CONFIG = {
  p1: { icon: '🥇', label: 'P1', ring: '#fbbf24' },
  p2: { icon: '🥈', label: 'P2', ring: '#9ca3af' },
  p3: { icon: '🥉', label: 'P3', ring: '#c2855a' },
}

export default function DropZone({ position, driverId, onDrop, onRemove }) {
  const [over, setOver] = useState(false)
  const cfg = POS_CONFIG[position]
  const driver = driverId ? getDriver(driverId) : null

  function handleDragOver(e) {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
    setOver(true)
  }

  function handleDrop(e) {
    e.preventDefault()
    setOver(false)
    const id = e.dataTransfer.getData('driverId')
    if (id) onDrop(position, id)
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={() => setOver(false)}
      onDrop={handleDrop}
      className={`rounded-lg p-2 transition-all min-h-[72px] ${
        over
          ? 'bg-red-950/40 outline outline-2 outline-red-500'
          : driver
          ? 'bg-neutral-800/50'
          : 'bg-neutral-900 border border-dashed border-neutral-700 hover:border-neutral-500'
      }`}
    >
      <div className="flex items-center gap-1 mb-1.5">
        <span className="text-sm">{cfg.icon}</span>
        <span
          className="text-xs font-bold tracking-wider"
          style={{ color: cfg.ring }}
        >
          {cfg.label}
        </span>
      </div>

      {driver ? (
        <DriverCardSmall
          driver={driver}
          onDoubleClick={() => onRemove(position)}
        />
      ) : (
        <div className="text-xs text-neutral-600 text-center py-2">
          drop driver here
        </div>
      )}
    </div>
  )
}
