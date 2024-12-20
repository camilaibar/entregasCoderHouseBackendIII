import customResponses from "../classes/customResponses.js";
import userService from "../services/users.services.js";

class UserController {
  async generateMockUsers(req, res) {
    try {
      const numberOfUsers = parseInt(req.query.count) || 50; // Amount of users to mock
      const mockUsers = await userService.generateMockUsers(numberOfUsers);
      customResponses.ok(res, mockUsers);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
