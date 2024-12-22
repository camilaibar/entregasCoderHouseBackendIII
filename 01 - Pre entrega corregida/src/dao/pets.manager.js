import petModel from "./mongoDB/models/pets.model.js";

class PetManager {
  async createPet(petData) {
    try {
      const pet = await petModel.create(petData);
      return pet;
    } catch (error) {
      throw new Error("Error creating pet");
    }
  }

  async getPets(query = {}) {
    try {
      return await petModel.find(query);
    } catch (error) {
      throw new Error("Error fetching pets");
    }
  }

  async getPetById(petId) {
    try {
      const pet = await petModel.findById(petId);
      if (!pet) {
        throw new Error("Pet not found");
      }
      return pet;
    } catch (error) {
      throw new Error("Error fetching pet by ID");
    }
  }

  async updatePet(petId, updates) {
    try {
      const updatedPet = await petModel.findByIdAndUpdate(petId, updates, {
        new: true,
      });
      if (!updatedPet) {
        throw new Error("Pet not found");
      }
      return updatedPet;
    } catch (error) {
      throw new Error("Error updating pet");
    }
  }

  async deletePet(petId) {
    try {
      const deletedPet = await petModel.findByIdAndDelete(petId);
      if (!deletedPet) {
        throw new Error("Pet not found");
      }
      return deletedPet;
    } catch (error) {
      throw new Error("Error deleting pet");
    }
  }
}

export default new PetManager();
