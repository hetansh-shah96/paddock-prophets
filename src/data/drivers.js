export const TEAMS = {
  redbull:     { name: 'Red Bull Racing', color: '#3671C6' },
  ferrari:     { name: 'Ferrari',         color: '#E8002D' },
  mercedes:    { name: 'Mercedes',        color: '#00D2BE' },
  mclaren:     { name: 'McLaren',         color: '#FF8000' },
  astonmartin: { name: 'Aston Martin',    color: '#358C75' },
  alpine:      { name: 'Alpine',          color: '#FF87BC' },
  williams:    { name: 'Williams',        color: '#64C4FF' },
  haas:        { name: 'Haas',            color: '#B6BABD' },
  audi:        { name: 'Audi',            color: '#52E252' },
  rb:          { name: 'Racing Bulls',    color: '#6692FF' },
  cadillac:    { name: 'Cadillac',        color: '#BF9B30' },
}

// 2026 F1 grid — 11 teams, 22 drivers
export const DRIVERS = [
  // Red Bull Racing
  { id: 'verstappen', name: 'Verstappen', number: 1,  emoji: '👑', team: 'redbull'     },
  { id: 'hadjar',     name: 'Hadjar',     number: 6,  emoji: '🌙', team: 'redbull'     },
  // Ferrari
  { id: 'leclerc',    name: 'Leclerc',    number: 16, emoji: '🎭', team: 'ferrari'     },
  { id: 'hamilton',   name: 'Hamilton',   number: 44, emoji: '🎸', team: 'ferrari'     },
  // Mercedes
  { id: 'russell',    name: 'Russell',    number: 63, emoji: '🧮', team: 'mercedes'    },
  { id: 'antonelli',  name: 'Antonelli',  number: 12, emoji: '⚡', team: 'mercedes'    },
  // McLaren
  { id: 'norris',     name: 'Norris',     number: 4,  emoji: '🎮', team: 'mclaren'     },
  { id: 'piastri',    name: 'Piastri',    number: 81, emoji: '🌟', team: 'mclaren'     },
  // Aston Martin
  { id: 'alonso',     name: 'Alonso',     number: 14, emoji: '🧠', team: 'astonmartin' },
  { id: 'stroll',     name: 'Stroll',     number: 18, emoji: '💸', team: 'astonmartin' },
  // Alpine
  { id: 'gasly',      name: 'Gasly',      number: 10, emoji: '🐓', team: 'alpine'      },
  { id: 'colapinto',  name: 'Colapinto',  number: 43, emoji: '🌶️', team: 'alpine'      },
  // Williams
  { id: 'albon',      name: 'Albon',      number: 23, emoji: '🕺', team: 'williams'    },
  { id: 'sainz',      name: 'Sainz',      number: 55, emoji: '🐂', team: 'williams'    },
  // Haas
  { id: 'ocon',       name: 'Ocon',       number: 31, emoji: '🛡️', team: 'haas'        },
  { id: 'bearman',    name: 'Bearman',    number: 87, emoji: '🐻', team: 'haas'        },
  // Audi (formerly Sauber)
  { id: 'hulkenberg', name: 'Hulkenberg', number: 27, emoji: '🏔️', team: 'audi'        },
  { id: 'bortoleto',  name: 'Bortoleto',  number: 5,  emoji: '🤸', team: 'audi'        },
  // Racing Bulls
  { id: 'lawson',     name: 'Lawson',     number: 30, emoji: '🦁', team: 'rb'          },
  { id: 'lindblad',   name: 'Lindblad',   number: 41, emoji: '🌱', team: 'rb'          },
  // Cadillac (new 11th team)
  { id: 'bottas',     name: 'Bottas',     number: 77, emoji: '🧘', team: 'cadillac'    },
  { id: 'perez',      name: 'Perez',      number: 11, emoji: '🌮', team: 'cadillac'    },
]

export const PREDICTORS = [
  { id: 'hetansh', name: 'Hetansh', emoji: '🎙️', title: 'The Strategist™' },
  { id: 'aakash',  name: 'Aakash',  emoji: '🔮', title: 'The Oracle'       },
  { id: 'preet',   name: 'Preet',   emoji: '🎯', title: 'Dark Horse'       },
  { id: 'varun',   name: 'Varun',   emoji: '💥', title: 'Chaos Agent'      },
]

export const POSITIONS = [
  { key: 'p1', label: 'P1', icon: '🥇', points: 3 },
  { key: 'p2', label: 'P2', icon: '🥈', points: 2 },
  { key: 'p3', label: 'P3', icon: '🥉', points: 1 },
]

export const SCORING_GUIDE = [
  { label: 'P1 correct', points: 3 },
  { label: 'P2 correct', points: 2 },
  { label: 'P3 correct', points: 1 },
  { label: 'Wild prediction', points: 5 },
]

export const TEAM_ORDER = [
  'redbull', 'ferrari', 'mercedes', 'mclaren',
  'astonmartin', 'alpine', 'williams', 'haas',
  'audi', 'rb', 'cadillac',
]

export function getDriver(id) {
  return DRIVERS.find(d => d.id === id) ?? null
}

export function emptyPredictions() {
  return Object.fromEntries(
    PREDICTORS.map(p => [p.id, { p1: null, p2: null, p3: null, wild: '' }])
  )
}
