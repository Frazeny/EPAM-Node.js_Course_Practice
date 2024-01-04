import { type Schema } from 'mongoose'
import { Genre } from '../../src/models/Genre'
import { Movies } from '../../src/models/Movie'
import { type IGenreDocument, type IMovie } from '../../src/movies/movies.interfaces'

jest.mock('../../src/models/Genre')
const mockedGenreModel = Genre as jest.Mocked<typeof Genre>

const existingGenreId = '41224d776a326fb40f000001'

const movie: IMovie = {
  title: 'Naruto',
  genres: [existingGenreId] as unknown as Schema.Types.ObjectId[],
  description: 'I love this anime :3',
  releaseDate: new Date()
}

describe('validateGenreId', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return true if genre ID exists', async () => {
    const existingGenre = {
      _id: existingGenreId,
      name: 'Anime'
    } as unknown as IGenreDocument
    mockedGenreModel.findById.mockResolvedValue(existingGenre)

    const movieModel = new Movies(movie)

    let error = null
    try {
      await movieModel.validate()
    } catch (e) {
      error = e
    }

    expect(error).toBeNull()
  })

  it('should return false if genre ID dosn\'t exists', async () => {
    mockedGenreModel.findById.mockResolvedValue(null)

    const movieModel = new Movies(movie)

    let error = null
    try {
      await movieModel.validate()
    } catch (e) {
      error = e
    }

    expect(error).not.toBeNull()
  })
})
