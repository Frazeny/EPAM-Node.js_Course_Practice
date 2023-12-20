import { type Document, Schema, model } from 'mongoose'

interface IGenre extends Document {
  name: string
}

const genreSchema = new Schema<IGenre>({
  name: {
    type: String,
    required: true
  }
})

export const Genre = model<IGenre>('Genre', genreSchema)
