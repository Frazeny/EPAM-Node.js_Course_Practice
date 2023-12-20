import { Router } from 'express'

import { ROUTES } from './movies.enum'
import {
  deleteGenre,
  deleteMovie,
  getAllMovies,
  getMoviesByGenre,
  getGenres,
  getMovie,
  postGenre,
  postMovie,
  updateMovie, updateGenre
} from './movies.controller'

const moviesRouter = Router()

moviesRouter.route(ROUTES.ROOT)
  .get(getAllMovies)
  .post(postMovie)
moviesRouter.route(ROUTES.GENRES)
  .get(getGenres)
  .post(postGenre)
moviesRouter.route(ROUTES.MOVIE)
  .get(getMovie)
  .put(updateMovie)
  .delete(deleteMovie)
moviesRouter.route(ROUTES.GENRES + ROUTES.GENRE)
  .get(getMoviesByGenre)
  .put(updateGenre)
  .delete(deleteGenre)
export default moviesRouter
