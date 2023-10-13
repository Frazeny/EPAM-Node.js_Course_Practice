import {Router} from "express";

import {ROUTES} from "./movies.enum.js"
import {getAllMovies, getMovie} from "./movies.controller.js";
const moviesRouter = new Router();

moviesRouter.route(ROUTES.ROOT).get(getAllMovies);
moviesRouter.route(ROUTES.MOVIE).get(getMovie)

export default moviesRouter;