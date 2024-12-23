import productsModel from "../dao/mongoDB/models/product.model.js";
import ProductManager from "../dao/product.manager.js";

class ProductController {
  constructor() {
    this.productManager = new ProductManager();
  }

  // Mock Products
  async mockProducts(req, res) {
    const products = Array.from({ length: 100 }).map((_, index) => ({
      title: `Product ${index + 1}`,
      description: `Description for product ${index + 1}`,
      code: `CODE${String(index + 1).padStart(3, "0")}`, // Genera códigos como CODE001, CODE002, etc.
      price: (10 + index * 0.5).toFixed(2), // Asigna precios que aumentan gradualmente
      status: index % 2 === 0, // Alterna entre true y false
      stock: 50 + index, // Aumenta el stock de manera incremental
      category: `Category ${String.fromCharCode(65 + (index % 26))}`, // Genera categorías de A a Z
      thumbnails: [`http://url.com/image${index + 1}.jpg`],
    }));

    // Insertar los productos en la base de datos
    await productsModel
      .insertMany(products)
      .then(() => {
        console.log("Sample product data inserted successfully!");
        mongoose.connection.close();
      })
      .catch((error) => {
        console.error("Error inserting data:", error);
      });

    return res.send("ok");
  }

  // Get all products
  async getAllProducts(req, res) {
    let { limit, page, sort, query } = req.query;

    // Set defaults for pagination
    limit = !isNaN(Number(limit)) && Number(limit) > 0 ? Number(limit) : 10;
    page = !isNaN(Number(page)) && Number(page) > 0 ? Number(page) : 1;

    try {
      const data = await this.productManager.readAllProducts(
        limit,
        page,
        sort,
        query
      );

      if (!data) {
        return res.status(500).json({
          status: "error",
          payload: [],
        });
      }

      return res.status(200).json({
        status: "success",
        payload: data.docs || [],
        totalPages: data.totalDocs,
        prevPage: data.prevPage,
        nextPage: data.nextPage,
        page: data.page,
        hasPrevPage: data.hasPrevPage,
        hasNextPage: data.hasNextPage,
        prevLink: data.hasPrevPage ? `?page=${data.prevPage}` : null,
        nextLink: data.hasNextPage ? `?page=${data.nextPage}` : null,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Error reading products, please try again later.",
        error: error.message,
      });
    }
  }

  // Get a product by ID
  async getProductByID(req, res) {
    const { pid } = req.params;
    if (!pid)
      return res
        .status(400)
        .json({ status: "error", message: "Invalid product ID" });

    try {
      const data = await this.productManager.readProductByID(pid);
      if (data)
        return res.status(200).json({ status: "success", payload: data });
      return res
        .status(404)
        .json({ status: "error", message: "Product not found" });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Error reading product, please try again later.",
        error: error.message,
      });
    }
  }

  // Create a new product
  async createProduct(req, res) {
    const {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails,
    } = req.body;

    // Validate required fields
    if (
      !title ||
      !description ||
      !code ||
      !price ||
      isNaN(price) ||
      !stock ||
      isNaN(stock) ||
      !category
    ) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid body parameters" });
    }

    if (!thumbnails || !Array.isArray(thumbnails)) thumbnails = [];
    if (typeof status !== "boolean") status = true;

    try {
      await this.productManager.createProduct({
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails,
      });

      return res.redirect("/handlebars/realTimeProducts");
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Error creating product, please try again later.",
        error: error.message,
      });
    }
  }

  // Update a product by ID
  async updateProductByID(req, res) {
    const { pid } = req.params;
    const {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails,
    } = req.body;

    if (!pid)
      return res
        .status(400)
        .json({ status: "error", message: "Invalid product ID" });

    try {
      const existingProduct = await this.productManager.readProductByID(pid);
      if (!existingProduct) {
        return res
          .status(404)
          .json({ status: "error", message: "Product not found" });
      }

      // Merge new and existing product data
      const updatedProduct = {
        pid: existingProduct._id,
        title: title || existingProduct.title,
        description: description || existingProduct.description,
        code: code || existingProduct.code,
        price: price || existingProduct.price,
        status: status !== undefined ? status : existingProduct.status,
        stock: stock || existingProduct.stock,
        category: category || existingProduct.category,
        thumbnails: Array.isArray(thumbnails)
          ? thumbnails
          : existingProduct.thumbnails,
      };

      await this.productManager.updateProductByID(updatedProduct);
      const updatedProducts = await this.productManager.readAllProducts();
      return res
        .status(200)
        .json({ status: "success", payload: updatedProducts });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Error updating product, please try again later.",
        error: error.message,
      });
    }
  }

  // Delete a product by ID
  async deleteProductByID(req, res) {
    const { pid } = req.params;
    if (!pid)
      return res
        .status(400)
        .json({ status: "error", message: "Invalid product ID" });

    try {
      await this.productManager.deleteProductByID(pid);
      return res
        .status(200)
        .json({ status: "success", message: "Product deleted successfully" });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Error deleting product, please try again later.",
        error: error.message,
      });
    }
  }
}

export default ProductController;
