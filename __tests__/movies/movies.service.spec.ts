import MoviesService from '../../src/movies/movies.service'
import { Movies } from '../../src/models/Movie'
import { Genre } from '../../src/models/Genre'
import BadRequest from '../../src/errors/bad-request'
import mocked = jest.mocked
import { type IGenre, type IGenreDocument, type IMovieDocument } from '../../src/movies/movies.interfaces'

jest.mock('../../src/models/Movie')
jest.mock('../../src/models/Genre')
const mockedMoviesModel = mocked(Movies)
const mockedGenreModel = mocked(Genre)

describe('MoviesService', () => {
  const mockedMovieDocument: IMovieDocument = {
    _id: 'testID',
    title: 'Movie Title',
    description: 'Movie Description',
    releaseDate: '2024-02-08',
    genres: ['test genre1', 'test genre2']
  } as unknown as IMovieDocument

  const mockedGenre: IGenre = {
    name: 'test genre1'
  }
  const mockedGenreDocument: IGenreDocument = {
    _id: 'testID1',
    ...mockedGenre
  } as unknown as IGenreDocument

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('getAllMovies', () => {
    it('should get a list of movies', async () => {
      mockedMoviesModel.find.mockImplementation(() => ({
        populate: jest.fn().mockResolvedValue([mockedMovieDocument])
      } as any))

      const movies = await MoviesService.getAllMovies()
      expect(movies).toEqual([mockedMovieDocument])
    })
  })

  describe('createNewMovie', () => {
    it('should create a new movie', async () => {
      mockedMoviesModel.findOne.mockResolvedValue(null)
      mockedMoviesModel.create.mockResolvedValue([mockedMovieDocument])
      const createdMovie = await MoviesService.createNewMovie(mockedMovieDocument)
      expect(createdMovie).toEqual([mockedMovieDocument])
    })

    it('should throw BadRequest when creating a movie that already exists', async () => {
      mockedMoviesModel.findOne.mockResolvedValue(mockedMovieDocument)

      await expect(MoviesService.createNewMovie(mockedMovieDocument)).rejects.toThrow(BadRequest)
      await expect(MoviesService.createNewMovie(mockedMovieDocument)).rejects.toThrow(`Movie with name: '${mockedMovieDocument.title}' already exists with id: ${mockedMovieDocument._id.toString()}`)
    })
  })

  describe('getMovie', () => {
    it('should get a movie by ID', async () => {
      mockedMoviesModel.findOne.mockImplementation(() => ({
        populate: jest.fn().mockResolvedValue(mockedMovieDocument)
      } as any))
      const movie = await MoviesService.getMovie('movieId')
      expect(movie).toEqual(mockedMovieDocument)
    })

    it('should throw BadRequest when no ID passed', async () => {
      await expect(MoviesService.getMovie('')).rejects.toThrow(BadRequest)
      await expect(MoviesService.getMovie('')).rejects.toThrow('id is not specified')
    })

    it('should throw BadRequest when movie with passed ID doesn\'t exist', async () => {
      mockedMoviesModel.findOne.mockImplementation(() => ({
        populate: jest.fn().mockResolvedValue(null)
      } as any))

      await expect(MoviesService.getMovie(mockedMovieDocument._id.toString())).rejects.toThrow(BadRequest)
      await expect(MoviesService.getMovie(mockedMovieDocument._id.toString())).rejects.toThrow(`Movie with id:${mockedMovieDocument._id.toString()} was not found :(`)
    })
  })

  describe('updateMovie', () => {
    it('should update a movie', async () => {
      mockedMoviesModel.findOneAndUpdate.mockImplementation(() => ({
        populate: jest.fn().mockResolvedValue(mockedMovieDocument)
      } as any))
      const updatedMovie = await MoviesService.updateMovie('movieId', mockedMovieDocument)
      expect(updatedMovie).toEqual(mockedMovieDocument)
    })

    it('should throw BadRequest when no ID passed', async () => {
      await expect(MoviesService.updateMovie('', mockedMovieDocument)).rejects.toThrow(BadRequest)
      await expect(MoviesService.updateMovie('', mockedMovieDocument)).rejects.toThrow('id is not specified')
    })

    it('should throw BadRequest when movie with passed ID doesn\'t exist', async () => {
      mockedMoviesModel.findOneAndUpdate.mockImplementation(() => ({
        populate: jest.fn().mockResolvedValue(null)
      } as any))

      await expect(MoviesService.updateMovie(mockedMovieDocument._id.toString(), mockedMovieDocument)).rejects.toThrow(BadRequest)
      await expect(MoviesService.updateMovie(mockedMovieDocument._id.toString(), mockedMovieDocument)).rejects.toThrow(`Movie with id:${mockedMovieDocument._id.toString()} was not found :(`)
    })
  })

  describe('deleteMovie', () => {
    it('should delete a movie', async () => {
      mockedMoviesModel.findOneAndDelete.mockImplementation(() => ({
        populate: jest.fn().mockResolvedValue(mockedMovieDocument)
      } as any))
      const deletedMovie = await MoviesService.deleteMovie('movieId')
      expect(deletedMovie).toEqual(mockedMovieDocument)
    })

    it('should throw BadRequest when no ID passed', async () => {
      await expect(MoviesService.deleteMovie('')).rejects.toThrow(BadRequest)
      await expect(MoviesService.deleteMovie('')).rejects.toThrow('id is not specified')
    })

    it('should throw BadRequest when movie with passed ID doesn\'t exist', async () => {
      mockedMoviesModel.findOneAndDelete.mockImplementation(() => ({
        populate: jest.fn().mockResolvedValue(null)
      } as any))

      await expect(MoviesService.deleteMovie(mockedMovieDocument._id.toString())).rejects.toThrow(BadRequest)
      await expect(MoviesService.deleteMovie(mockedMovieDocument._id.toString())).rejects.toThrow(`Movie with id:${mockedMovieDocument._id.toString()} was not found :(`)
    })
  })

  describe('getAllGenres', () => {
    it('should get a list of genres', async () => {
      mockedGenreModel.find.mockResolvedValue([mockedGenreDocument])
      const genres = await MoviesService.getAllGenres()
      expect(genres).toEqual([mockedGenreDocument])
    })
  })

  describe('getMoviesByGenre', () => {
    it('should get a list of movies by genre', async () => {
      mockedGenreModel.findOne.mockResolvedValue(mockedGenreDocument)
      mockedMoviesModel.find.mockResolvedValue([mockedMovieDocument])

      const filteredMovies = await MoviesService.getMoviesByGenre(mockedGenreDocument.name)
      expect(filteredMovies).toEqual([mockedMovieDocument])
    })

    it('should throw BadRequest when no genreName passed', async () => {
      await expect(MoviesService.getMoviesByGenre('')).rejects.toThrow(BadRequest)
      await expect(MoviesService.getMoviesByGenre('')).rejects.toThrow('Genre is not specified')
    })

    it('should throw BadRequest when no movies found with this genre name', async () => {
      mockedGenreModel.findOne.mockResolvedValue(null)

      await expect(MoviesService.getMoviesByGenre(mockedGenreDocument.name)).rejects.toThrow(BadRequest)
      await expect(MoviesService.getMoviesByGenre(mockedGenreDocument.name)).rejects.toThrow(`Genre with name: ${mockedGenreDocument.name} was not found :(`)
    })
  })

  describe('createNewGenre', () => {
    it('should create a new genre', async () => {
      mockedGenreModel.findOne.mockResolvedValue(null)
      mockedGenreModel.create.mockResolvedValue([mockedGenreDocument])
      const createdGenre = await MoviesService.createNewGenre(mockedGenreDocument)
      expect(createdGenre).toEqual([mockedGenreDocument])
    })

    it('should throw BadRequest when creating a genre that already exists', async () => {
      mockedGenreModel.findOne.mockResolvedValue(mockedGenreDocument)

      await expect(MoviesService.createNewGenre(mockedGenre)).rejects.toThrow(BadRequest)
      await expect(MoviesService.createNewGenre(mockedGenre)).rejects.toThrow(`Genre with name: '${mockedGenre.name}' already exists`)
    })
  })

  describe('updateGenre', () => {
    it('should update a genre', async () => {
      mockedGenreModel.findOneAndUpdate.mockResolvedValue(mockedGenreDocument)
      const updateGenre = await MoviesService.updateGenre(mockedGenreDocument._id.toString(), mockedGenre)
      expect(updateGenre).toEqual(mockedGenreDocument)
    })

    it('should throw BadRequest when no ID passed', async () => {
      await expect(MoviesService.updateGenre('', mockedGenre)).rejects.toThrow(BadRequest)
      await expect(MoviesService.updateGenre('', mockedGenre)).rejects.toThrow('id is not specified')
    })

    it('should throw BadRequest when genre with passed ID doesn\'t exist', async () => {
      mockedGenreModel.findOneAndUpdate.mockResolvedValue(null)

      await expect(MoviesService.updateGenre(mockedMovieDocument._id.toString(), mockedGenre)).rejects.toThrow(BadRequest)
      await expect(MoviesService.updateGenre(mockedMovieDocument._id.toString(), mockedGenre)).rejects.toThrow(`Genre with id:${mockedMovieDocument._id.toString()} was not found :(`)
    })
  })

  describe('deleteGenre', () => {
    it('should delete a genre', async () => {
      mockedGenreModel.findOneAndDelete.mockResolvedValue(mockedGenreDocument)
      const deletedGenre = await MoviesService.deleteGenre('movieId')
      expect(deletedGenre).toEqual(mockedGenreDocument)
    })

    it('should throw BadRequest when no ID passed', async () => {
      await expect(MoviesService.deleteGenre('')).rejects.toThrow(BadRequest)
      await expect(MoviesService.deleteGenre('')).rejects.toThrow('id is not specified')
    })

    it('should throw BadRequest when genre with passed ID doesn\'t exist', async () => {
      mockedGenreModel.findOneAndDelete.mockResolvedValue(null)

      await expect(MoviesService.deleteGenre(mockedGenreDocument._id.toString())).rejects.toThrow(BadRequest)
      await expect(MoviesService.deleteGenre(mockedGenreDocument._id.toString())).rejects.toThrow(`Genre with id:${mockedGenreDocument._id.toString()} was not found :(`)
    })
  })
})
