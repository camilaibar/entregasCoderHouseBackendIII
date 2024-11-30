import purchaseModel from "./mongoDB/models/purchase.model.js";

class PurchaseManager {
  // Create a new purchase
  async createPurchase(purchaseData) {
    try {
      const result = await purchaseModel.create(purchaseData);
      return result;
    } catch (error) {
      console.error("Error creating purchase:", error);
      throw new Error("Could not create purchase.");
    }
  }

  // Get a purchase by ID
  async getPurchaseById(purchaseId) {
    try {
      const result = await purchaseModel
        .findById(purchaseId)
        .populate("user cart");
      return result || null;
    } catch (error) {
      console.error("Error fetching purchase by ID:", error);
      throw new Error("Could not fetch purchase.");
    }
  }

  // Get all purchases
  async getAllPurchases() {
    try {
      const result = await purchaseModel.find().populate("user cart");
      return result;
    } catch (error) {
      console.error("Error fetching all purchases:", error);
      throw new Error("Could not fetch purchases.");
    }
  }

  // Update purchase status
  async updatePurchaseStatus(purchaseId, status) {
    try {
      const result = await purchaseModel.findByIdAndUpdate(
        purchaseId,
        { status },
        { new: true }
      );
      return result || null;
    } catch (error) {
      console.error("Error updating purchase status:", error);
      throw new Error("Could not update purchase.");
    }
  }

  // Delete a purchase
  async deletePurchase(purchaseId) {
    try {
      const result = await purchaseModel.findByIdAndDelete(purchaseId);
      return result || null;
    } catch (error) {
      console.error("Error deleting purchase:", error);
      throw new Error("Could not delete purchase.");
    }
  }
}

export default PurchaseManager;
