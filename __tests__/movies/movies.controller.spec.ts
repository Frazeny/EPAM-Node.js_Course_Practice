/* eslint-disable @typescript-eslint/no-confusing-void-expression, @typescript-eslint/await-thenable */
import { type Request, type Response } from 'express'
import * as MovieController from '../../src/movies/movies.controller'
import MoviesService from '../../src/movies/movies.service'
import { type IGenreDocument, type IMovieDocument } from '../../src/movies/movies.interfaces'
import BadRequest from '../../src/errors/bad-request'

jest.mock('../../src/movies/movies.service')

const mockedService = MoviesService as jest.Mocked<typeof MoviesService>
const errorMessage = 'Internal Server Error'

const genresMock = [
  { _id: '655ae8db156e619bde323fb7', name: 'Fantasy' },
  { _id: '655ae8f2156e619bde323fb8', name: 'Adventures' },
  { _id: '655ae90d156e619bde323fba', name: 'Melodramas' }
] as unknown as IGenreDocument[]
const genreIdMock = genresMock[0]._id

const movieMock: IMovieDocument = {
  _id: '1',
  title: 'Barbie',
  description: "She's everything. He's just Ken. The reaction of most of the men who watched was as follows: 'It's literally me, Ryan Gosling.'",
  releaseDate: '2023-07-09',
  genres: genresMock
} as unknown as IMovieDocument
const movieIdMock = movieMock._id

describe('MoviesController controller', () => {
  afterEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
  })

  const movieReqMock = {} as unknown as Request
  const movieResMock: Response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    statusCode: 200
  } as unknown as Response

  const genreReqMock = {} as unknown as Request
  const genreResMock: Response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    statusCode: 200
  } as unknown as Response

  const next = jest.fn()

  describe('getAllMovies', () => {
    mockedService.getAllMovies.mockResolvedValue([movieMock])

    it('should get a list of movies with status code 200', async () => {
      await MovieController.getAllMovies(movieReqMock, movieResMock, next)

      expect(mockedService.getAllMovies).toHaveBeenCalledTimes(1)
      expect(movieResMock.json).toHaveBeenCalledWith([movieMock])
      expect(movieResMock.statusCode).toBe(200)
      expect(next).not.toHaveBeenCalled()
    })

    it('should handle errors and call next', async () => {
      mockedService.getAllMovies.mockRejectedValue(new BadRequest(errorMessage))

      await MovieController.getAllMovies(movieReqMock, movieResMock, next)

      expect(mockedService.getAllMovies).toHaveBeenCalled()
      expect(next).toHaveBeenCalledWith(new Error(errorMessage))
    })
  })

  describe('getMovie', () => {
    const movieReqMock = { params: { id: movieIdMock } } as unknown as Request

    it('should get a movie by ID with status code 200', async () => {
      mockedService.getMovie.mockResolvedValue(movieMock)

      await MovieController.getMovie(movieReqMock, movieResMock, next)

      expect(mockedService.getMovie).toHaveBeenCalledWith(movieIdMock)
      expect(movieResMock.json).toHaveBeenCalledWith(movieMock)
      expect(movieResMock.statusCode).toBe(200)
      expect(next).not.toHaveBeenCalled()
    })

    it('should handle errors and call next', async () => {
      mockedService.getMovie.mockRejectedValue(new BadRequest(errorMessage))

      await MovieController.getMovie(movieReqMock, movieResMock, next)

      expect(mockedService.getMovie).toHaveBeenCalledWith(movieIdMock)
      expect(next).toHaveBeenCalledWith(new Error(errorMessage))
    })
  })

  describe('postMovie', () => {
    const movieReqMock = { body: { movie: movieMock } } as unknown as Request
    const movieResMock: Response = {
      json: jest.fn(),
      statusCode: 201,
      status: jest.fn().mockReturnThis()
    } as unknown as Response

    it('should create a new movie with status code 201', async () => {
      mockedService.createNewMovie.mockResolvedValue(movieMock)

      await MovieController.postMovie(movieReqMock, movieResMock, next)

      expect(mockedService.createNewMovie).toHaveBeenCalledWith(movieMock)
      expect(movieResMock.statusCode).toBe(201)
      expect(movieResMock.json).toHaveBeenCalledWith(movieMock)
      expect(next).not.toHaveBeenCalled()
    })

    it('should handle errors and call next', async () => {
      mockedService.createNewMovie.mockRejectedValue(new Error(errorMessage))

      await MovieController.postMovie(movieReqMock, movieResMock, next)

      expect(mockedService.createNewMovie).toHaveBeenCalledWith(movieMock)
      expect(next).toHaveBeenCalledWith(new Error(errorMessage))
    })
  })

  describe('updateMovie', () => {
    const movieReqMock = { params: { id: movieIdMock }, body: { movie: movieMock } } as unknown as Request

    it('should update a movie by ID with status code 200', async () => {
      mockedService.updateMovie.mockResolvedValue(movieMock)

      await MovieController.updateMovie(movieReqMock, movieResMock, next)

      expect(mockedService.updateMovie).toHaveBeenCalledWith(movieIdMock, movieMock)
      expect(movieResMock.statusCode).toBe(200)
      expect(movieResMock.json).toHaveBeenCalledWith(movieMock)
      expect(next).not.toHaveBeenCalled()
    })

    it('should handle errors and call next', async () => {
      mockedService.updateMovie.mockRejectedValue(new Error(errorMessage))

      await MovieController.updateMovie(movieReqMock, movieResMock, next)

      expect(mockedService.updateMovie).toHaveBeenCalledWith(movieIdMock, movieMock)
      expect(next).toHaveBeenCalledWith(new Error(errorMessage))
    })
  })

  describe('deleteMovie', () => {
    const movieReqMock = { params: { id: movieIdMock } } as unknown as Request

    it('should delete a movie by ID with status code 200', async () => {
      mockedService.deleteMovie.mockResolvedValue(movieMock)

      await MovieController.deleteMovie(movieReqMock, movieResMock, next)

      expect(mockedService.deleteMovie).toHaveBeenCalledWith(movieIdMock)
      expect(movieResMock.json).toHaveBeenCalledWith(movieMock)
      expect(next).not.toHaveBeenCalled()
    })

    it('should handle errors and call next', async () => {
      mockedService.deleteMovie.mockRejectedValue(new Error(errorMessage))

      await MovieController.deleteMovie(movieReqMock, movieResMock, next)

      expect(mockedService.deleteMovie).toHaveBeenCalledWith(movieIdMock)
      expect(next).toHaveBeenCalledWith(new Error(errorMessage))
    })
  })

  describe('getGenres', () => {
    it('should get all genres with status code 200', async () => {
      mockedService.getAllGenres.mockResolvedValue(genresMock)

      await MovieController.getGenres(genreReqMock, genreResMock, next)

      expect(mockedService.getAllGenres).toHaveBeenCalled()
      expect(genreResMock.json).toHaveBeenCalledWith(genresMock)
      expect(next).not.toHaveBeenCalled()
    })

    it('should handle errors and call next', async () => {
      mockedService.getAllGenres.mockRejectedValue(new Error(errorMessage))

      await MovieController.getGenres(genreReqMock, genreResMock, next)

      expect(mockedService.getAllGenres).toHaveBeenCalled()
      expect(next).toHaveBeenCalledWith(new Error(errorMessage))
    })
  })

  describe('getMoviesByGenre', () => {
    const genreReqMock = { params: { id: genreIdMock } } as unknown as Request

    it('should get movies by genre with status code 200', async () => {
      mockedService.getMoviesByGenre.mockResolvedValue([movieMock])

      await MovieController.getMoviesByGenre(genreReqMock, genreResMock, next)

      expect(mockedService.getMoviesByGenre).toHaveBeenCalledWith(genreIdMock)
      expect(genreResMock.json).toHaveBeenCalledWith([movieMock])
      expect(next).not.toHaveBeenCalled()
    })

    it('should handle errors and call next', async () => {
      mockedService.getMoviesByGenre.mockRejectedValue(new Error(errorMessage))

      await MovieController.getMoviesByGenre(genreReqMock, genreResMock, next)

      expect(mockedService.getMoviesByGenre).toHaveBeenCalledWith(genreIdMock)
      expect(next).toHaveBeenCalledWith(new Error(errorMessage))
    })
  })

  describe('postGenre', () => {
    const genreReqMock = { body: { genre: genresMock[0] } } as unknown as Request

    it('should create a new genre with status code 201', async () => {
      mockedService.createNewGenre.mockResolvedValue(genresMock[0])

      await MovieController.postGenre(genreReqMock, genreResMock, next)

      expect(mockedService.createNewGenre).toHaveBeenCalledWith(genresMock[0])
      expect(genreResMock.status).toHaveBeenCalledWith(201)
      expect(genreResMock.json).toHaveBeenCalledWith(genresMock[0])
      expect(next).not.toHaveBeenCalled()
    })

    it('should handle errors and call next', async () => {
      mockedService.createNewGenre.mockRejectedValue(new Error(errorMessage))

      await MovieController.postGenre(genreReqMock, genreResMock, next)

      expect(mockedService.createNewGenre).toHaveBeenCalledWith(genresMock[0])
      expect(next).toHaveBeenCalledWith(new Error(errorMessage))
    })
  })

  describe('updateGenre', () => {
    const genreReqMock = { params: { id: genreIdMock }, body: { genre: genresMock[0] } } as unknown as Request
    it('should update a genre by ID with status code 200', async () => {
      mockedService.updateGenre.mockResolvedValue(genresMock[0])

      await MovieController.updateGenre(genreReqMock, genreResMock, next)

      expect(mockedService.updateGenre).toHaveBeenCalledWith(genreIdMock, genresMock[0])
      expect(genreResMock.statusCode).toBe(200)
      expect(genreResMock.json).toHaveBeenCalledWith(genresMock[0])
      expect(next).not.toHaveBeenCalled()
    })

    it('should handle errors and call next', async () => {
      mockedService.updateGenre.mockRejectedValue(new Error(errorMessage))

      await MovieController.updateGenre(genreReqMock, genreResMock, next)

      expect(mockedService.updateGenre).toHaveBeenCalledWith(genreIdMock, genresMock[0])
      expect(next).toHaveBeenCalledWith(new Error(errorMessage))
    })
  })

  describe('deleteGenre', () => {
    const genreReqMock = { params: { id: genreIdMock } } as unknown as Request
    it('should delete a genre by ID with status code 200', async () => {
      mockedService.deleteGenre.mockResolvedValue(genresMock[0])

      await MovieController.deleteGenre(genreReqMock, genreResMock, next)

      expect(mockedService.deleteGenre).toHaveBeenCalledWith(genreIdMock)
      expect(genreResMock.json).toHaveBeenCalledWith(genresMock[0])
      expect(next).not.toHaveBeenCalled()
    })

    it('should handle errors and call next', async () => {
      mockedService.deleteGenre.mockRejectedValue(new Error(errorMessage))

      await MovieController.deleteGenre(genreReqMock, genreResMock, next)

      expect(mockedService.deleteGenre).toHaveBeenCalledWith(genreIdMock)
      expect(next).toHaveBeenCalledWith(new Error(errorMessage))
    })
  })
})
