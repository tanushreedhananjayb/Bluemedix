import axios from "axios";
import { USER_API } from "../config/api";

class UserService {
  static async getAllUsers() {
    try {
      const response = await axios.get(USER_API);
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }

  static async getUserById(id) {
    try {
      const response = await axios.get(`${USER_API}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching user ${id}:`, error);
      throw error;
    }
  }

  static async createUser(userData) {
    try {
      const response = await axios.post(USER_API, userData, {
        headers: { "Content-Type": "application/json" }, // ✅ Ensuring JSON format
      });
      return response.data;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  static async updateUser(id, userData) {
    try {
      const response = await axios.put(`${USER_API}/${id}`, userData, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating user ${id}:`, error);
      throw error;
    }
  }

  static async deleteUser(id) {
    try {
      await axios.delete(`${USER_API}/${id}`);
      return true;
    } catch (error) {
      console.error(`Error deleting user ${id}:`, error);
      throw error;
    }
  }
}

export default UserService;
