export class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = "Unauthorized error";
  }
}

export class Forbidden extends Error {
  constructor(message) {
    super(message);
    this.name = "Forbidden error";
  }
}

export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "Not found error";
  }
}

export class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.name = "Internal server error";
  }
}
