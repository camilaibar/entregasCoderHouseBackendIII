import customResponses from "../classes/CustomResponses.js";

const errorHandler = (error, req, res, next) => {
  return customResponses.error(res, error);
};

export default errorHandler;
