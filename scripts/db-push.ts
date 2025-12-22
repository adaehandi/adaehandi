import { getPayload } from 'payload'
import config from '../payload.config'

async function pushDB(): Promise<void> {
  console.log('Initializing Payload to push database schema...')
  console.log('POSTGRES_URL exists:', !!process.env.POSTGRES_URL)
  console.log('Database host:', process.env.POSTGRES_URL?.split('@')[1]?.split('/')[0] || 'unknown')

  try {
    console.log('Creating Payload instance (this triggers schema push with push: true)...')
    const payload = await getPayload({ config })
    console.log('Payload instance created successfully')

    // Verify tables exist by trying a simple query
    console.log('Verifying database schema by querying users collection...')

    const maxRetries = 3
    let lastError: unknown = null

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`Verification attempt ${attempt}/${maxRetries}...`)
        const result = await payload.find({
          collection: 'users',
          limit: 1,
        })
        console.log(`SUCCESS: Users table exists! Found ${result.totalDocs} users.`)
        lastError = null
        break
      } catch (queryError) {
        lastError = queryError
        console.error(
          `Attempt ${attempt} failed:`,
          queryError instanceof Error ? queryError.message : queryError
        )
        if (attempt < maxRetries) {
          console.log('Waiting 3 seconds before retry...')
          await new Promise((resolve) => setTimeout(resolve, 3000))
        }
      }
    }

    // Graceful shutdown
    console.log('Closing database connection...')
    if (payload.db && typeof payload.db.destroy === 'function') {
      await payload.db.destroy()
    }

    if (lastError) {
      console.error('FAILED: Database schema verification failed after all retries')
      console.error('This means the users table was not created.')
      console.error('Full error:', lastError)
      process.exit(1)
    }

    console.log('Database schema pushed and verified successfully!')
    process.exit(0)
  } catch (error) {
    console.error('Failed to initialize Payload:', error)
    process.exit(1)
  }
}

pushDB()
