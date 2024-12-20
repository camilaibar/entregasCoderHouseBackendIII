import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

import { InternalServerError } from "../classes/CustomErrors.js";
import userManager from "../dao/users.manager.js";

class UsersService {
  /**
   * Generates a specified number of mock users and stores them using userManager.
   *
   * @param {number} quantity - The number of mock users to generate.
   * @returns {Promise<Array>} A promise that resolves to an array of created mock user objects.
   * @throws {InternalServerError} Throws an error if there is an issue creating the mock users.
   */
  async generateMockUsers(quantity = 1) {
    let response = [];

    for (let i = 0; i < quantity; i++) {
      let newUser = {
        id: i + 1,
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: await bcrypt.hash("coder123", 10), // Encrypted password
        role: faker.helpers.arrayElement(["user", "admin"]),
        pets: [], // Empty pets array
      };
      await userManager.createUser(newUser);
      response.push(newUser);
    }

    if (response.length === 0)
      throw new InternalServerError("Error creating mock users");
    return response;
  }

  /**
   * Obtiene la lista de usuarios.
   * @param {Object} query - Filtros opcionales para buscar usuarios.
   * @returns {Array} Lista de usuarios.
   */
  async getUsers(query = {}) {
    const response = await userManager.getUsers(query);
    if (response.length === 0)
      throw new InternalServerError("Error fetching users");
    return response;
  }
}

export default new UsersService();
