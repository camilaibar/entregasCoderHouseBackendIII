import { Router } from "express";
import CartController from "../../controllers/cart.controller.js";
import { passportCall } from "../../utils/jwtUtils.js";

const router = Router();
const cartController = new CartController();

router.get("/", cartController.getAllCarts.bind(cartController));
router.get("/:cid", cartController.getCartByID.bind(cartController));
router.post("/", cartController.createCart.bind(cartController));
router.put("/:cid", cartController.modifyCartbyID.bind(cartController));
router.delete("/:cid", cartController.deleteCartByID.bind(cartController));
router.post(
  "/:cid/products/:pid",
  cartController.addProductToCart.bind(cartController)
);
// Handlebar add-to-cart route
router.post(
  "/products/:pid",
  passportCall("jwt-cookies"),
  cartController.addProductToCartWithHandlebars.bind(cartController)
);
router.delete(
  "/:cid/products/:pid",
  cartController.deleteProductByIDFromCart.bind(cartController)
);
// Handlebar delete-from-cart route
router.delete(
  "/:cid/products/:pid",
  passportCall("jwt-cookies"),
  cartController.deleteProductByIDFromCartWithHandlebars.bind(cartController)
);
// Handlebar checkout-btn route
router.post(
  "/purchase",
  passportCall("jwt-cookies"),
  cartController.checkoutCartWithHandlebars.bind(cartController)
);

export default router;
