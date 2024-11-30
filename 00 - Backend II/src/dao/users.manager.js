import userModel from "./mongoDB/models/user.model.js";

class UserManager {
  // Create a new user
  async createUser(userData) {
    try {
      const newUser = await userModel.create(userData);
      return newUser;
    } catch (error) {
      throw new Error("Error creating user: " + error.message);
    }
  }

  // Find a user by email
  async findUserByEmail(email) {
    try {
      const user = await userModel.findOne({ email });
      return user;
    } catch (error) {
      throw new Error("Error finding user: " + error.message);
    }
  }

  // Find a user by _id
  async findUserById(id) {
    try {
      const user = await userModel.findOne({ _id: id });
      return user;
    } catch (error) {
      throw new Error("Error finding user: " + error.message);
    }
  }

  // Update a user
  async updateUser(userId, updateData) {
    try {
      const updatedUser = await userModel.findByIdAndUpdate(
        userId,
        updateData,
        {
          new: true,
        }
      );
      return updatedUser;
    } catch (error) {
      throw new Error("Error updating user: " + error.message);
    }
  }

  // Delete a user
  async deleteUser(userId) {
    try {
      await userModel.findByIdAndDelete(userId);
      return { message: "User deleted successfully" };
    } catch (error) {
      throw new Error("Error deleting user: " + error.message);
    }
  }
}

export default UserManager;
