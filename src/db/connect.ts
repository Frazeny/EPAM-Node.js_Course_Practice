import * as mongoose from 'mongoose'

export const connectDB = async (url: string, options?: mongoose.ConnectOptions): Promise<typeof mongoose> => {
  return await mongoose.connect(url, options)
}
