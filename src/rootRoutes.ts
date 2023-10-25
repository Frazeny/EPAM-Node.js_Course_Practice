import { Router } from 'express';
import healthRouter from './health-check/health-check.route.js';
import moviesRouter from './movies/movies.route.js';

const rootRouter = new Router();

rootRouter.use('/health-check', healthRouter);
rootRouter.use('/movies', moviesRouter);

export default rootRouter;
