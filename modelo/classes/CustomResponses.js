const OK_STATUS = 200;

class CustomResponse {
  async ok(res, data) {
    return res.status(OK_STATUS).json({
      status: OK_STATUS,
      error: "success",
      message: data.message || "",
      data: data,
    });
  }

  async error(res, error) {
    return res.status(error.status || 500).json({
      status: error.status || 500,
      error: error.name || "Internal server error",
      message: error.message || "An non handled error accured",
    });
  }
}

export default new CustomResponse();
