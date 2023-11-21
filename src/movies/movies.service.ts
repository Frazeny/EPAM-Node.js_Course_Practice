import BadRequest from '../errors/bad-request'
import { type IGenre, type IMovie } from './movies.interfaces'
import { Movies } from '../models/Movie'
import { Genre } from '../models/Genre'

class MoviesService {
  async getAllMovies (): Promise<IMovie[]> {
    const movies: IMovie[] = await Movies.find().populate('genres')
    return movies
  }

  async createNewMovie (movie: IMovie): Promise<IMovie> {
    const existingMovie: IMovie | null = await Movies.findOne({ name: movie.title })
    if (existingMovie) {
      throw new BadRequest(`Movie with name: '${movie.title}' already exists with id: ${existingMovie._id}`)
    }
    const newMovie: IMovie = await Movies.create(movie)
    return newMovie
  }

  async getMovie (id: string): Promise<IMovie> {
    if (!id) {
      throw new BadRequest('id is not specified')
    }
    const movie: IMovie | null = await Movies.findOne({ _id: id }).populate('genres')
    if (!movie) {
      throw new BadRequest(`Movie with id:${id} was not found :(`)
    }
    return movie
  }

  async updateMovie (id: string, movie: IMovie): Promise<IMovie> {
    if (!id) {
      throw new BadRequest('id is not specified')
    }
    const updatedMovie: IMovie | null = await Movies.findOneAndUpdate({ _id: id }, movie, {
      new: true,
      runValidators: true
    }).populate('genres')
    if (!updatedMovie) {
      throw new BadRequest(`Movie with id:${id} was not found :(`)
    }
    return updatedMovie
  }

  async deleteMovie (id: string): Promise<IMovie> {
    if (!id) {
      throw new BadRequest('id is not specified')
    }
    const deletedMovie: IMovie | null = await Movies.findOneAndDelete({ _id: id }).populate('genres')
    if (!deletedMovie) {
      throw new BadRequest(`Movie with id:${id} was not found :(`)
    }
    return deletedMovie
  }

  async getAllGenres (): Promise<IGenre[]> {
    const genres: IGenre[] = await Genre.find()
    return genres
  }

  async getMoviesByGenre (genreName: string): Promise<IMovie[]> {
    if (!genreName) {
      throw new BadRequest('Genre is not specified')
    }
    const genre: IGenre | null = await Genre.findOne({ name: genreName })
    if (!genre) {
      throw new BadRequest(`Genre with name: ${genreName} was not found :(`)
    }

    const filteredMovies: IMovie[] | null = await Movies.find<IMovie>({ genres: { $in: [genre._id] } })
    if (!filteredMovies) {
      throw new BadRequest(`Movies with genre: ${genreName} was not found :( ${genre.name}`)
    }
    return filteredMovies
  }

  async createNewGenre (genre: IGenre): Promise<IGenre> {
    const existingGenre: IGenre | null = await Genre.findOne({ name: genre.name })
    if (existingGenre) {
      throw new BadRequest(`Genre with name: '${genre.name}' already exists`)
    }
    const newGenre: IGenre = await Genre.create(genre)
    return newGenre
  }

  async updateGenre (id: string, genre: IGenre): Promise<IGenre> {
    if (!id) {
      throw new BadRequest('id is not specified')
    }
    const updatedGenre: IGenre | null = await Genre.findOneAndUpdate({ _id: id }, genre, {
      new: true,
      runValidators: true
    })
    if (!updatedGenre) {
      throw new BadRequest(`Genre with id:${id} was not found :(`)
    }
    return updatedGenre
  }

  async deleteGenre (id: string): Promise<IGenre> {
    if (!id) {
      throw new BadRequest('id is not specified')
    }
    const deletedGenre: IGenre | null = await Genre.findOneAndDelete({ _id: id })
    if (!deletedGenre) {
      throw new BadRequest(`Genre with id:${id} was not found :(`)
    }
    return deletedGenre
  }
}

export default new MoviesService()
