import * as migration_20251222_171314 from './20251222_171314'

export const migrations = [
  {
    up: migration_20251222_171314.up,
    down: migration_20251222_171314.down,
    name: '20251222_171314',
  },
]
