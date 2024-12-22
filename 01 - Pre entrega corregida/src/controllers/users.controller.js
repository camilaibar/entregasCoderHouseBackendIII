import customResponses from "../classes/customResponses.js";
import userService from "../services/users.services.js";

class UsersController {
  async getUsers(req, res, next) {
    try {
      const users = await userService.getUsers();
      customResponses.ok(res, users);
    } catch (error) {
      next(error);
    }
  }

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

export default new UsersController();
