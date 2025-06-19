/**
 * Custom error class for API errors.
 * Extends the built-in Error class to include HTTP status codes, error details, and stack trace.
 *
 * @class
 * @extends Error
 *
 * @param {number} statusCode - HTTP status code associated with the error.
 * @param {string} [message='Internal Server Error'] - Human-readable error message.
 * @param {Array} [error=[]] - Additional error details or validation errors.
 * @param {string} [stack=''] - Optional stack trace for debugging.
 *
 * @property {number} statusCode - HTTP status code.
 * @property {string} message - Error message.
 * @property {Array} errors - Additional error details.
 * @property {string} stack - Stack trace.
 * @property {boolean} success - Indicates operation failure (always false).
 */
class ApiError extends Error {
  constructor(
    statusCode,
    message= 'Internal Server Error',
    error=[],
    stack= ''
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.errors = thiserrors;
    this.stack = stack; 
    this.success = false;


    if(stack) {
      this.stack = stack;
    }else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;