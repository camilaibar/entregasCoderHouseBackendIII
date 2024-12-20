const OK_STATUS = 200;
const UNAUTHORIZED_ERROR_STATUS = 401;
const FORBIDDEN_ERROR_STATUS = 403;
const NOT_FOUND_ERROR_STATUS = 404;
const INTERNAL_SERVER_ERROR_STATUS = 500;

class CustomResponse {
  async ok(res, data) {
    return res.status(OK_STATUS).json({
      status: OK_STATUS,
      error: "success",
      data: data,
    });
  }

  async unauthorized(res, error) {
    return res.status(UNAUTHORIZED_ERROR_STATUS).json({
      status: UNAUTHORIZED_ERROR_STATUS,
      error: error.name,
      message: error.message,
    });
  }

  async forbidden(res, error) {
    return res.status(FORBIDDEN_ERROR_STATUS).json({
      status: FORBIDDEN_ERROR_STATUS,
      error: error.name,
      message: error.message,
    });
  }

  async notFound(res, error) {
    return res.status(NOT_FOUND_ERROR_STATUS).json({
      status: NOT_FOUND_ERROR_STATUS,
      error: error.name,
      message: error.message,
    });
  }

  async internalServer(res, error) {
    return res.status(INTERNAL_SERVER_ERROR_STATUS).json({
      status: INTERNAL_SERVER_ERROR_STATUS,
      error: error.name,
      message: error.message,
    });
  }
}

export default new CustomResponse();
