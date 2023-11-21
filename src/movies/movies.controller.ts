import { type Request, type Response, type NextFunction, type RequestHandler } from 'express'

import MoviesService from './movies.service'
import { type IGenre, type IMovie } from './movies.interfaces'

/**
 * @openapi
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       properties:
 *         __id:
 *           type: string
 *           format: uuid
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         releaseDate:
 *           type: string
 *           format: date
 *         genres:
 *           type: array
 *           items:
 *             type: string
 *             format: uuid
 */
/**
 * @openapi
 * components:
 *   schemas:
 *     Genre:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 */

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
 *                  $ref: '#/components/schemas/Movie'
 *
 *             example:
 *               -  __id: "1"
 *                  title: "Barbie"
 *                  description: "She's everything. He's just Ken. The reaction of most of the men who watched was as follows: 'It's literally me, Ryan Gosling.'"
 *                  releaseDate: '2023-07-09'
 *                  genre: [{"_id":"655ae8db156e619bde323fb7","name":"Fantasy"},{"_id":"655ae8f2156e619bde323fb8","name":"Adventures"},{"_id":"655ae90d156e619bde323fba","name":"Melodramas"}]
 *               -  __id: "2"
 *                  title: "Berserk"
 *                  description: "The world of the Middle Ages, brutal and bloody battles, lavish balls, noble intrigue."
 *                  releaseDate: "1997-10-17"
 *                  genre: [{"_id":"655ae8f2156e619bde323fb8","name":"Adventures"},{"_id":"655b0fbd3e8e8f740185f52f","name":"Action"},{"_id":"655ae8db156e619bde323fb7","name":"Fantasy"},{"_id":"655b0fd03e8e8f740185f530","name":"Dramas"}]
 *
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
 * components:
 *   parameters:
 *     MovieIdParam:
 *       name: id
 *       in: path
 *       description: ID of the movie
 *       required: true
 *       schema:
 *         type: string
 */
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
 *     summary: Get movie by ID
 *     responses:
 *       200:
 *         description: Movie retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *             example:
 *               -  __id: "1"
 *                  title: "Barbie"
 *                  description: "She's everything. He's just Ken. The reaction of most of the men who watched was as follows: 'It's literally me, Ryan Gosling.'"
 *                  releaseDate: '2023-07-09'
 *                  genre: [{"_id":"655ae8db156e619bde323fb7","name":"Fantasy"},{"_id":"655ae8f2156e619bde323fb8","name":"Adventures"},{"_id":"655ae90d156e619bde323fba","name":"Melodramas"}]
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "id is not specified"
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
 *               message: "Something went wrong, please try again"
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
/**
 * @openapi
 * components:
 *   schemas:
 *     MovieWrapper:
 *       type: object
 *       properties:
 *         movie:
 *           $ref: '#/components/schemas/Movie'
 *       required:
 *         - movie
 */
/**
 * @openapi
 * /movies:
 *   post:
 *     summary: Create a new movie
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MovieWrapper'
 *     responses:
 *       '201':
 *         description: Movie created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 path:
 *                   type: string
 *                 message:
 *                   type: string
 *                 id:
 *                   type: string
 *               example:
 *                 path: "genre.0"
 *                 message: "Validation failed"
 *                 id: "322ae8db156e619bde000fb7"
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "Something went wrong, please try again"
 */
export const postMovie: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newMovie: IMovie = await MoviesService.createNewMovie(req.body.movie)
    res.status(201).json(newMovie)
  } catch (e) {
    next(e)
  }
}

/**
 * @openapi
 * /movies/{id}:
 *   put:
 *     summary: Update a movie by ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MovieWrapper'
 *     responses:
 *       '200':
 *         description: Movie updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "Validation failed"
 *       '404':
 *         description: Movie Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "Movie with id:123 was not found :("
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "Something went wrong, please try again"
 */
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

/**
 * @openapi
 * /movies/{id}:
 *   delete:
 *     summary: Delete a movie by ID
 *     responses:
 *       '200':
 *         description: Movie deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "Validation failed"
 *       '404':
 *         description: Movie Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "Movie with id:123 was not found :("
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "Something went wrong, please try again"
 */
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
