import { useState } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import { PREDICTORS, emptyPredictions } from './data/drivers'
import PredictionPage from './components/PredictionPage'
import ScoreboardPage from './components/ScoreboardPage'

const DEFAULT_RACE = 'Canadian Grand Prix 🍁'

export default function App() {
  const [page, setPage] = useState('predictions')
  const [editingRace, setEditingRace] = useState(false)
  const [currentRace, setCurrentRace] = useLocalStorage('pp_race', DEFAULT_RACE)
  const [predictions, setPredictions] = useLocalStorage('pp_predictions', emptyPredictions())
  const [raceHistory, setRaceHistory] = useLocalStorage('pp_history', [])

  const seasonScores = PREDICTORS.reduce((acc, p) => {
    acc[p.id] = raceHistory.reduce((sum, race) => sum + (Number(race.scores[p.id]) || 0), 0)
    return acc
  }, {})

  function handleSaveRace() {
    const nextName = window.prompt('Next race name:', 'British Grand Prix 🇬🇧')
    if (nextName === null) return

    setRaceHistory(prev => [
      ...prev,
      {
        id: Date.now(),
        raceName: currentRace,
        predictions,
        scores: Object.fromEntries(PREDICTORS.map(p => [p.id, 0])),
      },
    ])
    setPredictions(emptyPredictions())
    setCurrentRace(nextName.trim() || 'Next Grand Prix')
  }

  function handleUpdateScore(raceId, predictorId, score) {
    setRaceHistory(prev =>
      prev.map(r =>
        r.id === raceId
          ? { ...r, scores: { ...r.scores, [predictorId]: Number(score) } }
          : r
      )
    )
  }

  function handleDeleteRace(raceId) {
    setRaceHistory(prev => prev.filter(r => r.id !== raceId))
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Navbar */}
      <nav className="bg-neutral-900 border-b-2 border-red-600 px-4 py-0 flex items-center justify-between sticky top-0 z-50 h-14">
        <div className="flex items-center gap-2">
          <span className="text-xl">🏎️</span>
          <span className="text-lg font-black text-red-500 tracking-widest uppercase">
            Paddock Prophets
          </span>
          <span className="text-neutral-600 text-xs ml-1 font-medium hidden sm:block">
            F1 2026
          </span>
        </div>

        <div className="flex items-center gap-1 bg-neutral-800 rounded-lg p-1">
          <button
            onClick={() => setPage('predictions')}
            className={`px-3 py-1 rounded-md text-sm font-semibold transition-colors ${
              page === 'predictions'
                ? 'bg-red-600 text-white'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Predictions
          </button>
          <button
            onClick={() => setPage('scoreboard')}
            className={`px-3 py-1 rounded-md text-sm font-semibold transition-colors ${
              page === 'scoreboard'
                ? 'bg-red-600 text-white'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Scoreboard
          </button>
        </div>

        <div className="flex items-center gap-1">
          {editingRace ? (
            <input
              autoFocus
              className="bg-neutral-800 text-white text-sm px-2 py-1 rounded-lg border border-red-600 focus:outline-none w-48"
              value={currentRace}
              onChange={e => setCurrentRace(e.target.value)}
              onBlur={() => setEditingRace(false)}
              onKeyDown={e => e.key === 'Enter' && setEditingRace(false)}
            />
          ) : (
            <button
              className="flex items-center gap-1.5 text-sm text-neutral-300 hover:text-white transition-colors group"
              onClick={() => setEditingRace(true)}
            >
              <span className="font-semibold">{currentRace}</span>
              <span className="text-neutral-600 group-hover:text-neutral-400 text-xs">✏️</span>
            </button>
          )}
        </div>
      </nav>

      {page === 'predictions' ? (
        <PredictionPage predictions={predictions} setPredictions={setPredictions} />
      ) : (
        <ScoreboardPage
          raceHistory={raceHistory}
          seasonScores={seasonScores}
          onSaveRace={handleSaveRace}
          onUpdateScore={handleUpdateScore}
          onDeleteRace={handleDeleteRace}
          currentPredictions={predictions}
        />
      )}
    </div>
  )
}
