import BadRequest from '../errors/bad-request'
import { type IGenre, type IGenreDocument, type IMovie, type IMovieDocument } from './movies.interfaces'
import { Movies } from '../models/Movie'
import { Genre } from '../models/Genre'

class MoviesService {
  async getAllMovies (): Promise<IMovieDocument[]> {
    const movies: IMovieDocument[] = await Movies.find().populate('genres')
    return movies
  }

  async createNewMovie (movie: IMovie): Promise<IMovieDocument> {
    const existingMovie: IMovieDocument | null = await Movies.findOne({ name: movie.title })
    if (existingMovie) {
      throw new BadRequest(`Movie with name: '${movie.title}' already exists with id: ${existingMovie._id.toString()}`)
    }
    const newMovie: IMovieDocument = await Movies.create(movie)
    return newMovie
  }

  async getMovie (id: string): Promise<IMovieDocument> {
    if (!id) {
      throw new BadRequest('id is not specified')
    }
    const movie: IMovieDocument | null = await Movies.findOne({ _id: id }).populate('genres')
    if (!movie) {
      throw new BadRequest(`Movie with id:${id} was not found :(`)
    }
    return movie
  }

  async updateMovie (id: string, movie: IMovie): Promise<IMovieDocument> {
    if (!id) {
      throw new BadRequest('id is not specified')
    }
    const updatedMovie: IMovieDocument | null = await Movies.findOneAndUpdate({ _id: id }, movie, {
      new: true,
      runValidators: true
    }).populate('genres')
    if (!updatedMovie) {
      throw new BadRequest(`Movie with id:${id} was not found :(`)
    }
    return updatedMovie
  }

  async deleteMovie (id: string): Promise<IMovieDocument> {
    if (!id) {
      throw new BadRequest('id is not specified')
    }
    const deletedMovie: IMovieDocument | null = await Movies.findOneAndDelete({ _id: id }).populate('genres')
    if (!deletedMovie) {
      throw new BadRequest(`Movie with id:${id} was not found :(`)
    }
    return deletedMovie
  }

  async getAllGenres (): Promise<IGenreDocument[]> {
    const genres: IGenreDocument[] = await Genre.find()
    return genres
  }

  async getMoviesByGenre (genreName: string): Promise<IMovieDocument[]> {
    if (!genreName) {
      throw new BadRequest('Genre is not specified')
    }
    const genre: IGenreDocument | null = await Genre.findOne({ name: genreName })
    if (!genre) {
      throw new BadRequest(`Genre with name: ${genreName} was not found :(`)
    }

    const filteredMovies: IMovieDocument[] | null = await Movies.find({ genres: { $in: [genre._id] } })
    if (!filteredMovies) {
      throw new BadRequest(`Movies with genre: ${genreName} was not found :( ${genre.name}`)
    }
    return filteredMovies
  }

  async createNewGenre (genre: IGenre): Promise<IGenreDocument> {
    const existingGenre: IGenreDocument | null = await Genre.findOne({ name: genre.name })
    if (existingGenre) {
      throw new BadRequest(`Genre with name: '${genre.name}' already exists`)
    }
    const newGenre: IGenreDocument = await Genre.create(genre)
    return newGenre
  }

  async updateGenre (id: string, genre: IGenre): Promise<IGenreDocument> {
    if (!id) {
      throw new BadRequest('id is not specified')
    }
    const updatedGenre: IGenreDocument | null = await Genre.findOneAndUpdate({ _id: id }, genre, {
      new: true,
      runValidators: true
    })
    if (!updatedGenre) {
      throw new BadRequest(`Genre with id:${id} was not found :(`)
    }
    return updatedGenre
  }

  async deleteGenre (id: string): Promise<IGenreDocument> {
    if (!id) {
      throw new BadRequest('id is not specified')
    }
    const deletedGenre: IGenreDocument | null = await Genre.findOneAndDelete({ _id: id })
    if (!deletedGenre) {
      throw new BadRequest(`Genre with id:${id} was not found :(`)
    }
    return deletedGenre
  }
}

export default new MoviesService()
