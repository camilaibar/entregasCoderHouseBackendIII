import petsService from "../services/pets.services.js";
import usersService from "../services/users.services.js";
import customResponses from "../classes/customResponses.js";
import { NotFoundError } from "../classes/CustomErrors.js";

class MocksController {
  async generateMocks(req, res, next) {
    try {
      const { users, pets } = req.body;

      if (!users || !pets) {
        throw NotFoundError("Missing 'users' or 'pets' parameter");
      }

      const numberOfPets = parseInt(pets) || 50; // Amount of pets to mock
      const numberOfUsers = parseInt(users) || 50; // Amount of users to mock

      const mockPets = await petsService.generateMockPets(numberOfPets);
      const mockUsers = await usersService.generateMockUsers(numberOfUsers);

      customResponses.ok(res, {
        petsGenerated: mockPets.length,
        pets: mockPets,
        usersGenerated: mockUsers.length,
        users: mockUsers,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new MocksController();
