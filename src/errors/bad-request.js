import CustomAPIError from './custom-api-error.js';

export default class BadRequestError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}
