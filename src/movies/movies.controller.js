import MoviesService from "./movies.service.js";

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
export const getAllMovies = async (req, res, next) => {
    try {
        const movies = await MoviesService.getAllMovies();
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
export const getMovie = async (req, res, next) => {
    try {
        const movie = await MoviesService.getMovie(req.params.id);
        res.json(movie);
    } catch (e) {
        next(e)
    }
}