import customResponses from "../classes/customResponses.js";

const errorHandler = (error, req, res, next) => {
  return customResponses.error(res, error);
};

export default errorHandler;
