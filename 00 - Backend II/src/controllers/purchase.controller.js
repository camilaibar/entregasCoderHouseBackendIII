import PurchaseManager from "../dao/purchase.manager.js";

class PurchaseController {
  constructor() {
    this.purchaseManager = new PurchaseManager();
  }

  async createPurchase(req, res) {
    try {
      const purchaseData = req.body;
      console.log(purchaseData);
      const newPurchase = await this.purchaseManager.create(purchaseData);
      res.status(201).json(newPurchase);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getPurchaseById(req, res) {
    try {
      const { id } = req.params;
      const purchase = await this.purchaseManager.findById(id);
      if (!purchase) {
        return res.status(404).json({ message: "Purchase not found" });
      }
      res.status(200).json(purchase);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllPurchases(req, res) {
    try {
      const purchases = await this.purchaseManager.findAll();
      res.status(200).json(purchases);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updatePurchase(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const updatedPurchase = await this.purchaseManager.update(id, updateData);
      if (!updatedPurchase) {
        return res.status(404).json({ message: "Purchase not found" });
      }
      res.status(200).json(updatedPurchase);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deletePurchase(req, res) {
    try {
      const { id } = req.params;
      const deleted = await this.purchaseManager.delete(id);
      if (!deleted) {
        return res.status(404).json({ message: "Purchase not found" });
      }
      res.status(200).json({ message: "Purchase deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default PurchaseController;
