import { Schema, model } from 'mongoose'
import { Genre } from './Genre'
import { type IGenre, type IMovie } from '../movies/movies.interfaces'

const validateGenreId = async (genre: Schema.Types.ObjectId): Promise<boolean> => {
  const genreId: IGenre | null = await Genre.findById(genre)

  return genreId !== null
}

const movieSchema = new Schema<IMovie>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  genres: [
    {
      type: Schema.Types.ObjectId,
      ref: Genre,
      required: true,
      validate: {
        validator: validateGenreId,
        message: 'Provided genre IDs do not exist.'
      }
    }
  ]
})

export const Movies = model<IMovie>('Movie', movieSchema)
