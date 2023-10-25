import CustomAPIError from './custom-api-error'

export default class BadRequestError extends CustomAPIError {
  constructor (message: string) {
    super(message)
    this.statusCode = 404
  }
}
