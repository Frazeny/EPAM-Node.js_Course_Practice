import express, { type Express } from 'express'
import swaggerUi from 'swagger-ui-express'
import { errorHandlerMiddleware } from './middleware/error-handler'
import { notFoundMiddleware } from './middleware/not-found'
import { swaggerSpec } from './swagger/swagger'
import rootRouter from './rootRoutes'
import { connectDB } from './db/connect'

const PORT = process.env.PORT ?? 3000
const app: Express = express()

app.use(express.json())
// routes
app.use('/', rootRouter)

// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// middleware
app.use(express.json())
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const start = async (): Promise<void> => {
  try {
    const MONGO_URL = process.env.MONGO_URL
    if (!MONGO_URL) {
      throw new Error('MONGO_URL is not defined in the environment variables')
    }
    await connectDB(MONGO_URL)
    app.listen(PORT, () => {
      console.info(`Server in listening on port ${PORT}\
            \npid: ${process.pid}`)
    })
  } catch (e) {
    console.error(e)
  }
}

void start()
