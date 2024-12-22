import userModel from "./mongoDB/models/users.model.js";

class UserManager {
  async createUser(userData) {
    try {
      const user = await userModel.create(userData);
      return user;
    } catch (error) {
      throw new Error("Error creating user");
    }
  }

  async getUsers(query = {}) {
    try {
      return await userModel.find(query);
    } catch (error) {
      throw new Error("Error fetching users");
    }
  }

  async getUserById(userId) {
    try {
      const user = await userModel.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      throw new Error("Error fetching user by ID");
    }
  }

  async updateUser(userId, updates) {
    try {
      const updatedUser = await userModel.findByIdAndUpdate(userId, updates, {
        new: true,
      });
      if (!updatedUser) {
        throw new Error("User not found");
      }
      return updatedUser;
    } catch (error) {
      throw new Error("Error updating user");
    }
  }

  async deleteUser(userId) {
    try {
      const deletedUser = await userModel.findByIdAndDelete(userId);
      if (!deletedUser) {
        throw new Error("User not found");
      }
      return deletedUser;
    } catch (error) {
      throw new Error("Error deleting user");
    }
  }
}

export default new UserManager();
