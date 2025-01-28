const UNAUTHORIZED_ERROR_STATUS = 401;
const FORBIDDEN_ERROR_STATUS = 403;
const NOT_FOUND_ERROR_STATUS = 404;
const INTERNAL_SERVER_ERROR_STATUS = 500;

export class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = "Unauthorized error";
    this.status = UNAUTHORIZED_ERROR_STATUS;
  }
}

export class Forbidden extends Error {
  constructor(message) {
    super(message);
    this.name = "Forbidden error";
    this.status = FORBIDDEN_ERROR_STATUS;
  }
}

export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "Not found error";
    this.status = NOT_FOUND_ERROR_STATUS;
  }
}

export class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.name = "Internal server error";
    this.status = INTERNAL_SERVER_ERROR_STATUS;
  }
}
