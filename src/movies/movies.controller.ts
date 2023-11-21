import { type Request, type Response, type NextFunction, type RequestHandler } from 'express'

import MoviesService from './movies.service'
import { type IGenre, type IMovie } from './movies.interfaces'

/**
 * @openapi
 * /movies:
 *   get:
 *     summary: Get the list of movies
 *     responses:
 *       200:
 *         description: List of movies retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  type: object
 *                  properties:
 *                    __id:
 *                      type: string
 *                      format: uuid
 *                    title:
 *                      type: string
 *                    description:
 *                      type: string
 *                    releaseDate:
 *                      type: string
 *                      format: date
 *                    genre:
 *                      type: array
 *                      items:
 *                        type: string
 *
 *             example:
 *               -  __id: "1"
 *                  title: "Barbie"
 *                  description: "She's everything. He's just Ken. The reaction of most of the men who watched was as follows: 'It's literally me, Ryan Gosling.'"
 *                  releaseDate: '2023-07-09'
 *                  genre: ['Fantasy', 'Adventures', 'Comedies', 'Melodramas']
 *               -  __id: "2"
 *                  title: "Berserk"
 *                  description: "The world of the Middle Ages, brutal and bloody battles, lavish balls, noble intrigue."
 *                  releaseDate: "1997-10-17"
 *                  genre: ["Adventures", "Action", "Fantasy", "Dramas"]
 *
 */
export const getAllMovies: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const movies = await MoviesService.getAllMovies()
    res.json(movies)
  } catch (e) {
    next(e)
  }
}
/**
 * @openapi
 * /movies/{id}:
 *   parameters:
 *     -  name: id
 *        in: path
 *        description: ID of movie
 *        required: true
 *        schema:
 *          type: string
 *   get:
 *     summary: Get movie by id
 *     responses:
 *       200:
 *         description: Movie retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 __id:
 *                   type: string
 *                   format: uuid
 *                 tile:
 *                   type: string
 *                 description:
 *                   type: string
 *                 releaseDate:
 *                   type: string
 *                   format: date
 *                 genre:
 *                  type: array
 *                  items:
 *                    type: string
 *             example:
 *               -  __id: "1"
 *                  title: "Barbie"
 *                  description: "She's everything. He's just Ken. The reaction of most of the men who watched was as follows: 'It's literally me, Ryan Gosling.'"
 *                  releaseDate: '2023-07-09'
 *                  genre: ['Fantasy', 'Adventures', 'Comedies', 'Melodramas']
 *       404:
 *         description: Movie Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Movie with id:1231321 was not found :("
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Internal Server Error"
 *
 */
export const getMovie: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const movie = await MoviesService.getMovie(req.params.id)
    res.json(movie)
  } catch (e) {
    next(e)
  }
}

export const postMovie: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newMovie: IMovie = await MoviesService.createNewMovie(req.body.movie)
    res.status(201).json(newMovie)
  } catch (e) {
    next(e)
  }
}

export const updateMovie: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedMovie: IMovie = await MoviesService.updateMovie(req.params.id, req.body.movie)
    console.log(updatedMovie)
    res.status(200).json(updatedMovie)
  } catch (e) {
    console.error('Error updating movie:', e)
    next(e)
  }
}

export const deleteMovie: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const movie = await MoviesService.deleteMovie(req.params.id)
    res.json(movie)
  } catch (e) {
    next(e)
  }
}

export const getGenres: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const genres: IGenre[] = await MoviesService.getAllGenres()
    res.json(genres)
  } catch (e) {
    next(e)
  }
}

export const getMoviesByGenre: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const genre = await MoviesService.getMoviesByGenre(req.params.id)
    res.json(genre)
  } catch (e) {
    next(e)
  }
}

export const postGenre: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createdGenre: IGenre = await MoviesService.createNewGenre(req.body.genre)
    res.status(201).json(createdGenre)
  } catch (e) {
    next(e)
  }
}

export const updateGenre: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedGenre: IGenre = await MoviesService.updateGenre(req.params.id, req.body.genre)
    res.status(200).json(updatedGenre)
  } catch (e) {
    next(e)
  }
}
export const deleteGenre: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const movie: IGenre = await MoviesService.deleteGenre(req.params.id)
    res.json(movie)
  } catch (e) {
    next(e)
  }
}
