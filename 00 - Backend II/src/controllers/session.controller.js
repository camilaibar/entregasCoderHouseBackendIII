class SessionController {
  // Simple session test endpoint
  async getSession(req, res) {
    return res.send("session");
  }

  // Get current user information if authenticated
  async getCurrentUser(req, res) {
    try {
      if (!req.user) {
        return res
          .status(401)
          .json({ status: "error", message: "Unauthorized" });
      }
      return res.json({ ...req.user }); // Spread user data for response
    } catch (error) {
      return res
        .status(500)
        .json({ status: "error", message: "Failed to retrieve user data" });
    }
  }
}

export default SessionController;
