import DropZone from './DropZone'

export default function PredictorColumn({ predictor, prediction, onDrop, onRemove, onWildChange }) {
  const placed = [prediction.p1, prediction.p2, prediction.p3].filter(Boolean)

  function handleDrop(position, driverId) {
    if (placed.includes(driverId)) return
    onDrop(predictor.id, position, driverId)
  }

  function handleRemove(position) {
    onRemove(predictor.id, position)
  }

  return (
    <div className="flex flex-col gap-3 h-full">
      {/* Header card */}
      <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-4 text-center shrink-0">
        <div className="text-4xl mb-1">{predictor.emoji}</div>
        <div className="text-base font-bold text-white">{predictor.name}</div>
        <div className="text-xs text-red-400 font-medium mt-0.5">{predictor.title}</div>
      </div>

      {/* Drop zones */}
      <DropZone position="p1" driverId={prediction.p1} onDrop={handleDrop} onRemove={handleRemove} />
      <DropZone position="p2" driverId={prediction.p2} onDrop={handleDrop} onRemove={handleRemove} />
      <DropZone position="p3" driverId={prediction.p3} onDrop={handleDrop} onRemove={handleRemove} />

      {/* Wild prediction — grows to fill remaining space */}
      <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-3 flex flex-col flex-1 min-h-[100px]">
        <div className="text-xs font-semibold text-yellow-400 mb-1.5 shrink-0">🎲 Wild Prediction</div>
        <textarea
          className="flex-1 w-full bg-neutral-800 text-white text-xs rounded-lg px-2 py-1.5 resize-none border border-neutral-700 focus:border-red-600 focus:outline-none placeholder-neutral-600"
          placeholder='"e.g. Both Williams score points"'
          value={prediction.wild}
          onChange={e => onWildChange(predictor.id, e.target.value)}
        />
      </div>
    </div>
  )
}
