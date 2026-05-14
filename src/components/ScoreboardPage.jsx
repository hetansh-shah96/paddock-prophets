import { PREDICTORS, SCORING_GUIDE, getDriver } from '../data/drivers'

const MEDAL = ['🥇', '🥈', '🥉']

function SeasonCard({ predictor, score, rank }) {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 flex flex-col items-center gap-2 hover:border-red-600/50 transition-colors">
      {rank <= 3 && (
        <span className="text-2xl">{MEDAL[rank - 1]}</span>
      )}
      <div className="text-4xl">{predictor.emoji}</div>
      <div className="text-lg font-bold text-white">{predictor.name}</div>
      <div className="text-xs text-red-400 font-medium">{predictor.title}</div>
      <div className="mt-2 text-3xl font-bold text-red-500">{score}</div>
      <div className="text-xs text-neutral-500">points</div>
    </div>
  )
}

function PredictionSummary({ prediction }) {
  if (!prediction) return <span className="text-neutral-600 text-xs">—</span>
  const slots = [prediction.p1, prediction.p2, prediction.p3].map((id, i) => {
    if (!id) return null
    const d = getDriver(id)
    return d ? `${['P1', 'P2', 'P3'][i]}: ${d.emoji}${d.name}` : null
  }).filter(Boolean)
  return (
    <div className="text-xs text-neutral-300 space-y-0.5">
      {slots.map((s, i) => <div key={i}>{s}</div>)}
      {prediction.wild && (
        <div className="text-yellow-500 text-xs">🎲 {prediction.wild}</div>
      )}
    </div>
  )
}

export default function ScoreboardPage({
  raceHistory,
  seasonScores,
  onSaveRace,
  onUpdateScore,
  onDeleteRace,
  currentPredictions,
}) {
  const ranked = [...PREDICTORS]
    .map(p => ({ ...p, score: seasonScores[p.id] ?? 0 }))
    .sort((a, b) => b.score - a.score)

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">

      {/* Season standings */}
      <section>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-red-500">◆</span> Season Standings
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {ranked.map((p, i) => (
            <SeasonCard key={p.id} predictor={p} score={p.score} rank={i + 1} />
          ))}
        </div>
      </section>

      {/* Scoring guide */}
      <section className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
        <div className="text-sm font-bold text-neutral-400 mb-3 uppercase tracking-widest">
          Scoring Guide
        </div>
        <div className="flex flex-wrap gap-4">
          {SCORING_GUIDE.map(g => (
            <div key={g.label} className="flex items-center gap-2">
              <span className="text-red-500 font-bold text-lg">+{g.points}</span>
              <span className="text-sm text-neutral-300">{g.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Save race button */}
      <section className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-red-500">◆</span> Race History
        </h2>
        <button
          onClick={onSaveRace}
          className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold text-sm px-5 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          <span>💾</span> Save race &amp; start new
        </button>
      </section>

      {/* Race history table */}
      {raceHistory.length === 0 ? (
        <div className="text-center py-16 text-neutral-600">
          <div className="text-5xl mb-3">🏁</div>
          <p className="text-lg">No races saved yet.</p>
          <p className="text-sm mt-1">Make your predictions and click "Save race &amp; start new" after each race.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-neutral-800">
                <th className="text-left text-neutral-500 font-semibold py-2 pr-4 text-xs uppercase tracking-wider">Race</th>
                {PREDICTORS.map(p => (
                  <th key={p.id} className="text-center text-neutral-500 font-semibold py-2 px-2 text-xs uppercase tracking-wider">
                    {p.emoji} {p.name}
                  </th>
                ))}
                <th className="py-2 px-2"></th>
              </tr>
            </thead>
            <tbody>
              {[...raceHistory].reverse().map(race => (
                <tr key={race.id} className="border-b border-neutral-800/50 hover:bg-neutral-900/50">
                  <td className="py-3 pr-4">
                    <div className="font-semibold text-white">{race.raceName}</div>
                    {/* Show predictions summary */}
                    <div className="grid grid-cols-4 gap-1 mt-1">
                      {PREDICTORS.map(p => (
                        <div key={p.id}>
                          <div className="text-xs text-neutral-600 mb-0.5">{p.name}</div>
                          <PredictionSummary prediction={race.predictions?.[p.id]} />
                        </div>
                      ))}
                    </div>
                  </td>
                  {PREDICTORS.map(p => (
                    <td key={p.id} className="py-3 px-2 text-center">
                      <input
                        type="number"
                        min="0"
                        max="11"
                        className="w-14 bg-neutral-800 border border-neutral-700 focus:border-red-600 text-white text-center rounded-lg px-1 py-1 text-sm focus:outline-none"
                        value={race.scores[p.id] ?? 0}
                        onChange={e => onUpdateScore(race.id, p.id, e.target.value)}
                      />
                    </td>
                  ))}
                  <td className="py-3 px-2 text-center">
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete "${race.raceName}" from history?`)) {
                          onDeleteRace(race.id)
                        }
                      }}
                      className="text-neutral-600 hover:text-red-500 transition-colors text-lg leading-none"
                      title="Delete race"
                    >
                      ×
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
