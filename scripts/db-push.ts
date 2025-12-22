import { getPayload } from 'payload'
import config from '../payload.config'

async function pushDB(): Promise<void> {
  console.log('Initializing Payload to push database schema...')

  try {
    await getPayload({ config })
    console.log('Database schema pushed successfully!')
    process.exit(0)
  } catch (error) {
    console.error('Failed to push database schema:', error)
    process.exit(1)
  }
}

pushDB()
