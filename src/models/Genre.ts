import { Schema, model } from 'mongoose'
import { type IGenre } from '../movies/movies.interfaces'

const genreSchema = new Schema<IGenre>({
  name: {
    type: String,
    required: true
  }
})

export const Genre = model<IGenre>('Genre', genreSchema)
