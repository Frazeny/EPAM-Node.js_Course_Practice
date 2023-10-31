import { Router } from 'express'
import healthRouter from './health-check/health-check.route'
import moviesRouter from './movies/movies.route'

const rootRouter = Router()

rootRouter.use('/health-check', healthRouter)
rootRouter.use('/movies', moviesRouter)

export default rootRouter
