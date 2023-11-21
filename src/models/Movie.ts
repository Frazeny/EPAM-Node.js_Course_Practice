import { type Document, Schema, model } from 'mongoose'
import { Genre } from './Genre'
import { type IGenre } from '../movies/movies.interfaces'

interface IMovie extends Document {
  title: string
  description: string
  releaseDate: Date
  genres: Schema.Types.ObjectId[]
}

const validateGenreId = async (genre: Schema.Types.ObjectId): Promise<boolean> => {
  // Check if all genre IDs are valid
  const genreId: IGenre | null = await Genre.findById(genre)
  // const invalidGenreIds: IGenre[] = await Genre.findById({ $in: genres } )

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
