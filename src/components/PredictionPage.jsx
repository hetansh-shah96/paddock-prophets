import { DRIVERS, TEAMS, PREDICTORS, TEAM_ORDER } from '../data/drivers'
import { DriverCardDraggable } from './DriverCard'
import PredictorColumn from './PredictorColumn'

export default function PredictionPage({ predictions, setPredictions }) {
  function getPlacedInColumns(driverId) {
    return PREDICTORS
      .filter(p => {
        const pred = predictions[p.id]
        return pred.p1 === driverId || pred.p2 === driverId || pred.p3 === driverId
      })
      .map(p => p.id)
  }

  function handleDrop(predictorId, position, driverId) {
    setPredictions(prev => ({
      ...prev,
      [predictorId]: { ...prev[predictorId], [position]: driverId },
    }))
  }

  function handleRemove(predictorId, position) {
    setPredictions(prev => ({
      ...prev,
      [predictorId]: { ...prev[predictorId], [position]: null },
    }))
  }

  function handleWildChange(predictorId, value) {
    setPredictions(prev => ({
      ...prev,
      [predictorId]: { ...prev[predictorId], wild: value },
    }))
  }

  return (
    <div className="flex" style={{ height: 'calc(100vh - 56px)' }}>
      {/* Driver pool sidebar */}
      <aside className="w-56 shrink-0 bg-neutral-950 border-r border-neutral-800 overflow-y-auto p-3 flex flex-col gap-3">
        <div className="text-xs font-bold text-neutral-500 uppercase tracking-widest sticky top-0 bg-neutral-950 pb-2 pt-1">
          2026 Driver Pool
        </div>
        {TEAM_ORDER.map(teamId => {
          const team = TEAMS[teamId]
          const teamDrivers = DRIVERS.filter(d => d.team === teamId)
          return (
            <div key={teamId}>
              <div
                className="text-xs font-bold uppercase tracking-wider mb-1.5 pb-1 border-b border-neutral-800"
                style={{ color: team.color }}
              >
                {team.name}
              </div>
              <div className="flex flex-col gap-1">
                {teamDrivers.map(driver => (
                  <DriverCardDraggable
                    key={driver.id}
                    driver={driver}
                    placedInColumns={getPlacedInColumns(driver.id)}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </aside>

      {/* Prediction columns — grow to fill all remaining space */}
      <main className="flex-1 overflow-x-auto overflow-y-auto p-4 bg-neutral-950">
        <div className="flex gap-4 h-full min-w-[720px]">
          {PREDICTORS.map(predictor => (
            <div key={predictor.id} className="flex-1 min-w-[180px]">
              <PredictorColumn
                predictor={predictor}
                prediction={predictions[predictor.id]}
                onDrop={handleDrop}
                onRemove={handleRemove}
                onWildChange={handleWildChange}
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
