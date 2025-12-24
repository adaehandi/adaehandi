import * as migration_20251222_171314 from './20251222_171314'
import * as migration_20251223_110042_add_collections_globals from './20251223_110042_add_collections_globals'

export const migrations = [
  {
    up: migration_20251222_171314.up,
    down: migration_20251222_171314.down,
    name: '20251222_171314',
  },
  {
    up: migration_20251223_110042_add_collections_globals.up,
    down: migration_20251223_110042_add_collections_globals.down,
    name: '20251223_110042_add_collections_globals',
  },
]
