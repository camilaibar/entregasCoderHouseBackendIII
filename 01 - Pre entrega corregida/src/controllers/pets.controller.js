import petService from "../services/pets.services.js";
import customResponses from "../classes/customResponses.js";

class PetsController {
  async generateMockPets(req, res, next) {
    try {
      const numberOfPets = parseInt(req.query.count) || 50; // Amount of pets to mock
      const mockPets = await petService.generateMockPets(numberOfPets);
      customResponses.ok(res, mockPets);
    } catch (error) {
      next(error);
    }
  }
}

export default new PetsController();
