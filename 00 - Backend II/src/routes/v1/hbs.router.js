import { Router } from "express";
import passport from "passport";

import { addJWTTokenToCookies, passportCall } from "../../utils/jwtUtils.js";

import ProductManager from "../../dao/product.manager.js";
import CartManager from "../../dao/cart.manager.js";
import PurchaseManager from "../../dao/purchase.manager.js";

const router = Router();
const productManager = new ProductManager();
const cartManager = new CartManager();
const purchaseManager = new PurchaseManager();

router.get("/login", (req, res, next) => {
  return res.render("login");
});

router.get("/register", (req, res, next) => {
  return res.render("signup");
});

// Protect the profile route with JWT authentication from cookies
router.get("/profile", passportCall("jwt-cookies"), (req, res) => {
  res.render("profile", {
    ...req.user, // This will contain user data if authentication succeeds
  });
});

router.get("/", passport.authenticate("github"), (req, res, next) => {
  addJWTTokenToCookies(res, req.user); //When github is logged in, it redirects to here and we add the token to cookies
  return res.render("home", {
    ...req.user.toObject(),
  });
});

router.get("/products", passportCall("jwt-cookies"), async (req, res, next) => {
  if (!req.user) return res.redirect("/hbs/login");

  let products = await productManager.readAllProducts();
  return res.render("products", { products: products.docs });
});

router.get("/cart", passportCall("jwt-cookies"), async (req, res, next) => {
  try {
    if (!req.user) return res.redirect("/hbs/login");

    let cart = await cartManager.readCartByID(req.cookies.cart);
    let products = [];
    let total = 0;

    if (cart) {
      // Flatten the products array so that price and title are directly accessible
      products = cart.products.map((product) => {
        total =
          total + Number(product.pid.price) * Number(product.pid.quantity);
        return {
          id: product.pid._id,
          title: product.pid.title,
          price: product.pid.price,
          quantity: product.quantity,
        };
      });
    } else {
      cart = await cartManager.createCart(req.user.id);
      res.cookie("cart", cart._id);
    }

    return res.render("cart", {
      cart,
      cid: cart._id,
      products: products,
      total,
    });

    // Redirect to login page if no cart is found
  } catch (error) {
    next(error); // Pass the error to the next middleware (error handler)
  }
});

router.get(
  "/purchase/:id",
  passportCall("jwt-cookies"),
  async (req, res, next) => {
    const { id } = req.params;
    if (!id) return res.redirect("/hbs/cart");

    const purchase = await purchaseManager.getPurchaseById(id);
    if (purchase) {
      const cart = await cartManager.readCartByID(purchase.cart._id);
      if (cart) {
        // Flatten the products array so that price and title are directly accessible
        let items = cart.products.map((product) => {
          return {
            title: product.pid.title,
            price: product.pid.price,
            quantity: product.quantity,
          };
        });
        return res.render("purchase", {
          purchase,
          id: purchase._id,
          purchase_datetime: purchase.createdAt,
          purchaser: purchase.user.email,
          total: purchase.total,
          items,
        });
      }
    }
    return res.redirect("/hbs/cart");
  }
);

export default router;
