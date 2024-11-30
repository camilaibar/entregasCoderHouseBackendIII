import { Router } from "express";
import PurchaseController from "../../controllers/purchase.controller.js";

const router = Router();
const purchaseController = new PurchaseController();

// Create a new purchase
router.post("/", purchaseController.createPurchase.bind(purchaseController));

// Get a purchase by ID
router.get("/:id", purchaseController.getPurchaseById.bind(purchaseController));

// Get all purchases
router.get("/", purchaseController.getAllPurchases.bind(purchaseController));

// Update a purchase by ID
router.put("/:id", purchaseController.updatePurchase.bind(purchaseController));

// Delete a purchase by ID
router.delete(
  "/:id",
  purchaseController.deletePurchase.bind(purchaseController)
);

export default router;
