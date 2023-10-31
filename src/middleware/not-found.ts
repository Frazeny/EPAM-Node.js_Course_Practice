import { type Request, type Response, type RequestHandler } from 'express'

export const notFoundMiddleware: RequestHandler = (req: Request, res: Response) => res.status(404).send('Route does not exist')
