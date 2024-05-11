export class UnauthorizedError extends Error {
  private statusCode: number;

  constructor(
    message = "You must be logged in to access the page!",
    statusCode = 401,
  ) {
    super(message);
    this.name = "UnauthorizedError";
    this.statusCode = statusCode;
  }
}

export class ForbiddenError extends Error {
  public statusCode: number;

  constructor(message = "Resource is Forbidden!") {
    super(message);
    this.name = "ForbiddenError";
    this.statusCode = 403;
  }
}

export class ConflictError extends Error {
  public statusCode: number;

  constructor(message = "Request is conflict!") {
    super(message);
    this.name = "ConflictError";
    this.statusCode = 409;
  }
}

export class ServerError extends Error {
  public statusCode: number;

  constructor(message = "Something went wrong!") {
    super(message);
    this.name = "ServerError";
    this.statusCode = 500;
  }
}
