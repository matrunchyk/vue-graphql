export default class BaseException extends Error {
  constructor(message = '') {
    super();
    this.message = message;
    if ('captureStackTrace' in Error) {
      Error.captureStackTrace(this, BaseException);
    } else {
      this.stack = (new Error()).stack;
    }
  }
}
