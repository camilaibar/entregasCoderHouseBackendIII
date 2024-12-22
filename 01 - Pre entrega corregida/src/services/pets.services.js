import { faker } from "@faker-js/faker";

import petManager from "../dao/pets.manager.js";
import { InternalServerError } from "../classes/CustomErrors.js";

class PetsService {
  /**
   * Generates a specified number of mock pets and stores them using petManager.
   *
   * @param {number} quantity - The number of mock pets to generate.
   * @returns {Promise<Array>} A promise that resolves to an array of created mock pet objects.
   * @throws {InternalServerError} Throws an error if there is an issue creating the mock pets.
   */
  async generateMockPets(quantity = 1) {
    let response = [];

    for (let i = 0; i < quantity; i++) {
      let newPet = {
        id: i + 1,
        name: faker.person.firstName(),
        type: faker.helpers.arrayElement(["Dog", "Cat", "Bird", "Fish"]),
        age: faker.number.int({ min: 1, max: 15 }),
      };
      await petManager.createPet(newPet);
      response.push(newPet);
    }

    if (response.length === 0)
      throw new InternalServerError("Error creating mock pet");
    return response;
  }

  /**
   * Gets pets list
   * @param {Object} query - Filters.
   * @returns {Array} List.
   */
  async getPets(query = {}) {
    const response = await petManager.getPets(query);
    if (response.length === 0)
      throw new InternalServerError("Error fetching pets");
    return response;
  }
}

export default new PetsService();
