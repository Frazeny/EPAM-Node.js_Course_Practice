import MoviesService from "./movies.service.js";

export const getAllMovies = async (req, res, next) => {
    try {
        const movies = await MoviesService.getAllMovies();
        res.json(movies)
    } catch (e) {
        next(e)
    }
}

export const getMovie = async (req, res, next) => {
    try {
        const movie = await MoviesService.getMovie(req.params.id);
        res.json(movie);
    } catch (e) {
        next(e)
    }
}