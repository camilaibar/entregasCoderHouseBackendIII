import CartManager from "../dao/cart.manager.js";
import PurchaseManager from "../dao/purchase.manager.js";

class CartController {
  constructor() {
    this.cartManager = new CartManager();
  }

  async getAllCarts(req, res) {
    try {
      const data = await this.cartManager.readAllCarts();
      return data
        ? res.status(200).json(data)
        : res.status(404).send("No carts found");
    } catch (error) {
      return res
        .status(500)
        .send("Error reading carts, try again later. " + error.message);
    }
  }

  async getCartByID(req, res) {
    const { cid } = req.params;
    if (!cid) return res.status(400).send("Invalid cart ID");

    try {
      const data = await this.cartManager.readCartByID(cid);
      return data
        ? res.status(200).json(data)
        : res.status(404).send("Cart not found");
    } catch (error) {
      return res
        .status(500)
        .send("Error reading cart, try again later. " + error.message);
    }
  }

  async createCart(req, res) {
    const { user, products } = req.body;
    if (!user || !products || !Array.isArray(products)) {
      return res.status(400).send("Invalid body parameters");
    }

    try {
      const result = await this.cartManager.createCart(user, products);
      return result
        ? res.status(201).json(result)
        : res.status(400).send("Error creating cart");
    } catch (error) {
      return res
        .status(500)
        .send("Error creating cart, try again later. " + error.message);
    }
  }

  async modifyCartbyID(req, res) {
    const { cid } = req.params;
    const { products } = req.body;
    if (!cid || !products || !Array.isArray(products)) {
      return res.status(400).send("Invalid parameters");
    }

    try {
      const updatedCart = await this.cartManager.updateCartByID({
        cid,
        products,
      });
      return updatedCart
        ? res.status(200).json(updatedCart)
        : res.status(404).send("Cart not found");
    } catch (error) {
      return res
        .status(500)
        .send("Error updating cart, try again later. " + error.message);
    }
  }

  async deleteCartByID(req, res) {
    const { cid } = req.params;
    if (!cid) return res.status(400).send("Invalid cart ID");

    try {
      const result = await this.cartManager.deleteAllProductsFromCart(cid);
      return result
        ? res.status(200).send("Cart products removed successfully")
        : res.status(404).send("Cart not found");
    } catch (error) {
      return res
        .status(500)
        .send(
          "Error deleting products from cart, try again later. " + error.message
        );
    }
  }

  async addProductToCart(req, res) {
    const { cid, pid } = req.params;
    if (!cid || !pid)
      return res.status(400).send("Invalid cart ID or product ID");

    try {
      const result = await this.cartManager.addProductToCart(pid, cid);
      return result
        ? res.status(200).json(await this.cartManager.readAllCarts())
        : res.status(500).send("Error adding product to cart, try again later");
    } catch (error) {
      return res
        .status(500)
        .send(
          "Error adding product to cart, try again later. " + error.message
        );
    }
  }

  async addProductToCartWithHandlebars(req, res) {
    const { pid } = req.params;
    const user = req.user;

    if (!pid) return res.status(400).send("Invalid product ID");
    if (!user) return res.status(401).redirect("/hbs/login");

    let cart = req.cart;
    let cid = cart?._id;

    // If there is no associated cart, find or create one for the user
    if (!cid) {
      const existingCart = await this.cartManager.findCartByUserId(user.id);
      cid = existingCart
        ? existingCart._id
        : await this.cartManager.createCart(user.id);
      res.cookie("cart", cid);
    }

    try {
      // Retrieve the updated cart to check if the product is already in it
      const cartData = await this.cartManager.readCartByID(cid);

      // Check if the product is already in the cart
      let existingProduct = false;

      cartData.products = cartData.products.map((item) => {
        if (item.pid._id == pid) {
          // Increase the quantity of the existing product
          existingProduct = true;
          item.quantity += 1;
        }
        return item;
      });

      if (existingProduct) {
        await this.cartManager.updateCartByID(cartData);
      } else {
        // Add the new product to the cart with quantity 1
        await this.cartManager.addProductToCart(pid, cid);
      }

      return res.status(200).send("Product added to cart successfully");
    } catch (error) {
      return res
        .status(500)
        .send(
          "Error adding product to cart, try again later. " + error.message
        );
    }
  }

  async deleteProductByIDFromCart(req, res) {
    const { cid, pid } = req.params;
    if (!cid || !pid)
      return res.status(400).send("Invalid cart ID or product ID");

    try {
      const result = await this.cartManager.deleteProductByIDFromCart(pid, cid);
      return result
        ? res.status(200).send("Product deleted from cart successfully")
        : res.status(404).send("Product or cart not found");
    } catch (error) {
      return res
        .status(500)
        .send(
          "Error deleting product from cart, try again later. " + error.message
        );
    }
  }

  async deleteProductByIDFromCartWithHandlebars(req, res) {
    const { pid } = req.params;
    const user = req.user;

    if (!pid) return res.status(400).send("Invalid product ID");
    if (!user) return res.status(401).redirect("/hbs/login");

    let cart = req.cart;
    let cid = cart?._id;

    // If there is no associated cart, find or create one for the user
    if (!cid) {
      const existingCart = await this.cartManager.findCartByUserId(user.id);
      cid = existingCart
        ? existingCart._id
        : await this.cartManager.createCart(user.id);
      res.cookie("cart", cid);
    }

    try {
      // Retrieve the updated cart to check if the product exists in it
      const cartData = await this.cartManager.readCartByID(cid);

      // Filter out the product to be deleted
      const initialLength = cartData.products.length;
      console.log(cartData.products);
      cartData.products = cartData.products.filter(
        (item) => item.pid._id != pid
      );
      console.log(cartData.products);

      // Check if a product was actually removed
      if (cartData.products.length === initialLength) {
        return res.status(404).send("Product not found in cart");
      }

      // Update the cart in the database
      await this.cartManager.updateCartByID(cartData);

      return res.status(200).send("Product deleted from cart successfully");
    } catch (error) {
      return res
        .status(500)
        .send(
          "Error deleting product from cart, try again later. " + error.message
        );
    }
  }

  async checkoutCartWithHandlebars(req, res) {
    const purchaseManager = new PurchaseManager();
    const user = req.user;
    if (!user) return res.status(401).redirect("/hbs/login");

    const { cart, total } = req.body;
    if (!cart) return res.status(401).redirect("/hbs/cart");

    const purchase = await purchaseManager.createPurchase({
      user: user.id,
      cart,
      total,
    });
    return res.redirect(`/hbs/purchase/${purchase._id}`);
  }
}

export default CartController;
