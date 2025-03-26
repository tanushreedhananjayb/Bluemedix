import axios from "axios";
import { PRODUCT_API } from "../config/api";

class ProductService {
  static async getAllProducts() {
    try {
      const response = await axios.get(PRODUCT_API);
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  }

  static async getProductById(id) {
    try {
      const response = await axios.get(`${PRODUCT_API}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw error;
    }
  }

  static async createProduct(productData) {
    try {
      const response = await axios.post(PRODUCT_API, productData, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  }

  static async updateProduct(id, productData) {
    try {
      const response = await axios.put(`${PRODUCT_API}/${id}`, productData, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating product ${id}:`, error);
      throw error;
    }
  }

  static async deleteProduct(id) {
    try {
      await axios.delete(`${PRODUCT_API}/${id}`);
      return true;
    } catch (error) {
      console.error(`Error deleting product ${id}:`, error);
      throw error;
    }
  }
}

export default ProductService;
