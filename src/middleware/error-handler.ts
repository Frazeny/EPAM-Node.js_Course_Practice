import CustomAPIError from '../errors/custom-api-error'
import { type Request, type Response, type NextFunction, type ErrorRequestHandler } from 'express'

export const errorHandlerMiddleware: ErrorRequestHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomAPIError) {
    return (res.status(err.statusCode).json({ message: err.message }))
  }
  return res.status(500).json({ message: 'Something went wrong, please try again' })
}
