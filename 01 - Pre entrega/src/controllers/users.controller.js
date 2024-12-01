import UserManager from "../dao/users.manager.js";
import UserService from "../services/users.services.js";

class UserController {
  constructor() {
    this.userManager = new UserManager();
  }

  async createUser(req, res) {
    try {
      const newUser = await this.userManager.createUser(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: "Error creating user" });
    }
  }

  async getUsers(req, res) {
    try {
      const users = await this.userManager.getUsers(req.query);
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Error fetching users" });
    }
  }

  async getUserById(req, res) {
    try {
      const user = await this.userManager.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Error fetching user by ID" });
    }
  }

  async updateUser(req, res) {
    try {
      const updatedUser = await this.userManager.updateUser(
        req.params.id,
        req.body
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: "Error updating user" });
    }
  }

  async deleteUser(req, res) {
    try {
      const deletedUser = await this.userManager.deleteUser(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting user" });
    }
  }

  // Método para crear un usuario ficticio
  async createMockUser(req, res) {
    try {
      const mockUser = await UserService.createMockUser();
      res.status(201).json(mockUser);
    } catch (error) {
      res.status(500).json({ message: "Error creating mock user" });
    }
  }

  // Método para listar usuarios ficticios
  async generateMockUsers(req, res) {
    try {
      const numberOfUsers = parseInt(req.query.count) || 50; // Número de usuarios a generar
      const mockUsers = [];
      for (let i = 0; i < numberOfUsers; i++) {
        const mockUser = await UserService.createMockUser();
        mockUsers.push(mockUser);
      }
      res.status(200).json(mockUsers);
    } catch (error) {
      res.status(500).json({ message: "Error generating mock users" });
    }
  }
}

export default UserController;
