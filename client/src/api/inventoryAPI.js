import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/inventory';

const inventoryAPI = {
  // Get all inventory items
  getAllItems: async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching inventory:', error);
      throw error;
    }
  },

  // Get single item by ID
  getItemById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching item:', error);
      throw error;
    }
  },

  // Create new item
  createItem: async (itemData) => {
    try {
      const response = await axios.post(API_BASE_URL, itemData);
      return response.data;
    } catch (error) {
      console.error('Error creating item:', error);
      throw error;
    }
  },

  // Use/consume items
  useItem: async (id, quantityUsed) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/${id}/use`, {
        quantityUsed,
      });
      return response.data;
    } catch (error) {
      console.error('Error using item:', error);
      throw error.response?.data || error;
    }
  },

  // Reorder item
  reorderItem: async (id, quantityToAdd) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/${id}/reorder`, {
        quantityToAdd,
      });
      return response.data;
    } catch (error) {
      console.error('Error reordering item:', error);
      throw error.response?.data || error;
    }
  },

  // Update item details
  updateItem: async (id, itemData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, itemData);
      return response.data;
    } catch (error) {
      console.error('Error updating item:', error);
      throw error;
    }
  },

  // Delete item
  deleteItem: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting item:', error);
      throw error;
    }
  },
};

export default inventoryAPI;
