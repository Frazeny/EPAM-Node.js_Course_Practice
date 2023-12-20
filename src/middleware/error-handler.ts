import CustomAPIError from '../errors/custom-api-error'
import { type Request, type Response, type NextFunction, type ErrorRequestHandler } from 'express'
import { Error as MongooseError } from 'mongoose'

export const errorHandlerMiddleware: ErrorRequestHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomAPIError) {
    return (res.status(err.statusCode).json({ message: err.message }))
  }
  if (err instanceof MongooseError.ValidationError) {
    const validationErrors = Object.values(err.errors).map((error) => ({
      path: error.path,
      message: error.message,
      id: error.value
    }))

    return res.status(400).json({ error: 'Validation failed', validationErrors })
  }
  return res.status(500).json({ message: 'Something went wrong, please try again' })
}
