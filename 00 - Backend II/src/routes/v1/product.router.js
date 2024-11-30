import { Router } from "express";
import ProductController from "../../controllers/product.controller.js";

const router = Router();
const productController = new ProductController();

// This endpoint is for creating a sample data for products for testing the cart and user managemnet
router.get("/sample", productController.mockProducts.bind(productController));
router.get("/", productController.getAllProducts.bind(productController));
router.get("/:pid", productController.getProductByID.bind(productController));
router.post("/", productController.createProduct.bind(productController));
router.put(
  "/:pid",
  productController.updateProductByID.bind(productController)
);
router.delete(
  "/:pid",
  productController.deleteProductByID.bind(productController)
);

export default router;
