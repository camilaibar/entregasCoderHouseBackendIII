import UserManager from "../dao/users.manager.js";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

const userManager = new UserManager();

class userService {
  /**
   * Crea un usuario ficticio (mock).
   * @returns {Object} El usuario creado.
   */
  async createMockUser() {
    try {
      const mockUser = {
        name: faker.name.fullName(),
        email: faker.internet.email(),
        password: await bcrypt.hash("coder123", 10), // Contraseña encriptada
        role: faker.helpers.arrayElement(["user", "admin"]),
        pets: [], // Array vacío
      };

      return await userManager.createUser(mockUser);
    } catch (error) {
      console.error("Error creating mock user:", error.message);
      throw new Error("Error creating mock user");
    }
  }

  /**
   * Obtiene la lista de usuarios.
   * @param {Object} query - Filtros opcionales para buscar usuarios.
   * @returns {Array} Lista de usuarios.
   */
  async getUsers(query = {}) {
    try {
      return await userManager.getUsers(query);
    } catch (error) {
      console.error("Error fetching users:", error.message);
      throw new Error("Error fetching users");
    }
  }
}

export default userService;
