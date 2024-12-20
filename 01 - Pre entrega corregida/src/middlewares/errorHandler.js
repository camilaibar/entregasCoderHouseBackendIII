import {
  Forbidden,
  NotFoundError,
  UnauthorizedError,
} from "../classes/CustomErrors.js";
import customResponses from "../classes/customResponses.js";

const errorHandler = (error, req, res, next) => {
  if (error instanceof UnauthorizedError)
    return customResponses.unauthorized(res, error);
  if (error instanceof Forbidden) return customResponses.forbidden(res, error);
  if (error instanceof NotFoundError)
    return customResponses.notFound(res, error);

  return customResponses.internalServer(res, error);
};

export default errorHandler;
