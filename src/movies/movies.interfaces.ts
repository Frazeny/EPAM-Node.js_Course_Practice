import { type Schema, type HydratedDocument } from 'mongoose'

export interface IMovie {
  title: string
  description: string
  releaseDate: Date
  genres: Schema.Types.ObjectId[]
}

export type IMovieDocument = HydratedDocument<IMovie>

export interface IGenre {
  name: string
}

export type IGenreDocument = HydratedDocument<IGenre>
