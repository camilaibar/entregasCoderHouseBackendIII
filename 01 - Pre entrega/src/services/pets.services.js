import PetManager from "../dao/pets.manager.js";
import { faker } from "@faker-js/faker";

const petManager = new PetManager();

class PetService {
  async createMockPet() {
    try {
      const mockPet = {
        name: faker.name.firstName(),
        species: faker.helpers.arrayElement(["Dog", "Cat", "Bird", "Fish"]),
        age: faker.datatype.number({ min: 1, max: 15 }),
      };

      return await petManager.createPet(mockPet);
    } catch (error) {
      throw new Error("Error creating mock pet");
    }
  }
}

export default PetService;
