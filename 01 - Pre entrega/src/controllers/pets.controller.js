import PetManager from "../dao/pets.manager.js";
import PetService from "../services/pets.services.js";

class PetController {
  constructor() {
    this.petManager = new PetManager();
  }

  async createPet(req, res) {
    try {
      const newPet = await this.petManager.createPet(req.body);
      res.status(201).json(newPet);
    } catch (error) {
      res.status(500).json({ message: "Error creating pet" });
    }
  }

  async getPets(req, res) {
    try {
      const pets = await this.petManager.getPets(req.query);
      res.status(200).json(pets);
    } catch (error) {
      res.status(500).json({ message: "Error fetching pets" });
    }
  }

  async getPetById(req, res) {
    try {
      const pet = await this.petManager.getPetById(req.params.id);
      if (!pet) {
        return res.status(404).json({ message: "Pet not found" });
      }
      res.status(200).json(pet);
    } catch (error) {
      res.status(500).json({ message: "Error fetching pet by ID" });
    }
  }

  async updatePet(req, res) {
    try {
      const updatedPet = await this.petManager.updatePet(
        req.params.id,
        req.body
      );
      if (!updatedPet) {
        return res.status(404).json({ message: "Pet not found" });
      }
      res.status(200).json(updatedPet);
    } catch (error) {
      res.status(500).json({ message: "Error updating pet" });
    }
  }

  async deletePet(req, res) {
    try {
      const deletedPet = await this.petManager.deletePet(req.params.id);
      if (!deletedPet) {
        return res.status(404).json({ message: "Pet not found" });
      }
      res.status(200).json({ message: "Pet deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting pet" });
    }
  }

  // Método para crear una mascota ficticia
  async createMockPet(req, res) {
    try {
      const mockPet = await PetService.createMockPet();
      res.status(201).json(mockPet);
    } catch (error) {
      res.status(500).json({ message: "Error creating mock pet" });
    }
  }

  // Método para listar mascotas ficticias
  async generateMockPets(req, res) {
    try {
      const numberOfPets = parseInt(req.query.count) || 50; // Número de mascotas a generar
      const mockPets = [];
      for (let i = 0; i < numberOfPets; i++) {
        const mockPet = await PetService.createMockPet();
        mockPets.push(mockPet);
      }
      res.status(200).json(mockPets);
    } catch (error) {
      res.status(500).json({ message: "Error generating mock pets" });
    }
  }
}

export default PetController;
