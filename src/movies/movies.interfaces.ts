import { type Document, type Schema } from 'mongoose'

export interface IMovie extends Document {
  title: string
  description: string
  releaseDate: Date
  genres: Schema.Types.ObjectId[]
}
export interface IGenre extends Document {
  name: string
}
