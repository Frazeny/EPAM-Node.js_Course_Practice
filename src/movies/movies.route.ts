import { Router } from 'express';

import { ROUTES } from './movies.enum';
import { getAllMovies, getMovie } from './movies.controller';

const moviesRouter = Router();

moviesRouter.route(ROUTES.ROOT).get(getAllMovies);
moviesRouter.route(ROUTES.MOVIE).get(getMovie);

export default moviesRouter;
