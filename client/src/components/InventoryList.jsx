import React, { useState, useEffect } from 'react';
import inventoryAPI from '../api/inventoryAPI';
import InventoryItem from './InventoryItem';
import AddItemForm from './AddItemForm';
import '../styles/InventoryList.css';

const InventoryList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [successMessage, setSuccessMessage] = useState('');

  const categories = ['All', 'Grains', 'Vegetables', 'Dairy', 'Beverages', 'Spices', 'Oils'];

  // Fetch inventory items on mount
  useEffect(() => {
    fetchInventory();
  }, []);

  // Auto-hide success message
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(''), 4000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const fetchInventory = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await inventoryAPI.getAllItems();
      setItems(response.data);
    } catch (err) {
      setError(err.message || 'Failed to fetch inventory');
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async (itemData) => {
    try {
      const response = await inventoryAPI.createItem(itemData);
      setItems([...items, response.data]);
      setShowAddForm(false);
      setSuccessMessage(`✓ ${itemData.itemName} added successfully`);
    } catch (err) {
      setError(err.message || 'Failed to add item');
    }
  };

  const handleUseItem = async (id, quantityUsed) => {
    try {
      const response = await inventoryAPI.useItem(id, quantityUsed);
      if (response.success) {
        // Update the local state immediately
        setItems(
          items.map((item) =>
            item._id === id
              ? response.data
              : item
          )
        );
        setSuccessMessage(`✓ ${response.data.itemName} quantity reduced by ${quantityUsed}`);
      }
    } catch (err) {
      setError(err.message || 'Failed to use item');
    }
  };

  const handleReorderItem = async (id, quantityToAdd) => {
    try {
      const response = await inventoryAPI.reorderItem(id, quantityToAdd);
      if (response.success) {
        // Update the local state immediately
        setItems(
          items.map((item) =>
            item._id === id
              ? response.data
              : item
          )
        );
        setSuccessMessage(`✓ ${response.data.itemName} reordered successfully. Added ${quantityToAdd}`);
      }
    } catch (err) {
      setError(err.message || 'Failed to reorder item');
    }
  };

  const handleDelete = async (id) => {
    try {
      await inventoryAPI.deleteItem(id);
      setItems(items.filter((item) => item._id !== id));
      setSuccessMessage('✓ Item deleted successfully');
    } catch (err) {
      setError(err.message || 'Failed to delete item');
    }
  };

  // Filter items based on search term and category
  const filteredItems = items.filter((item) => {
    const matchesSearch = item.itemName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Calculate statistics
  const stats = {
    total: items.length,
    available: items.filter((item) => item.stockStatus === 'Available').length,
    lowStock: items.filter((item) => item.stockStatus === 'Low Stock').length,
    outOfStock: items.filter((item) => item.stockStatus === 'Out of Stock').length,
  };

  if (loading && items.length === 0) {
    return <div className="loading">Loading inventory...</div>;
  }

  return (
    <div className="inventory-list-container">
      <div className="header-section">
        <h1>🍽️ Restaurant Inventory Management</h1>
        <button
          className="btn btn-primary btn-small"
          onClick={() => setShowAddForm(true)}
        >
          + Add New Item
        </button>
      </div>

      {error && (
        <div className="alert alert-error">
          ❌ {error}
          <button onClick={() => setError(null)}>✕</button>
        </div>
      )}

      {successMessage && (
        <div className="alert alert-success">
          {successMessage}
        </div>
      )}

      <div className="stats-section">
        <div className="stat-card">
          <h4>Total Items</h4>
          <p className="stat-number">{stats.total}</p>
        </div>
        <div className="stat-card available">
          <h4>Available</h4>
          <p className="stat-number">{stats.available}</p>
        </div>
        <div className="stat-card warning">
          <h4>Low Stock</h4>
          <p className="stat-number">{stats.lowStock}</p>
        </div>
        <div className="stat-card error">
          <h4>Out of Stock</h4>
          <p className="stat-number">{stats.outOfStock}</p>
        </div>
      </div>

      <div className="controls-section">
        <input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <div className="filter-buttons">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${filterCategory === cat ? 'active' : ''}`}
              onClick={() => setFilterCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div className="empty-state">
          <p>No inventory items found</p>
          <button
            className="btn btn-primary"
            onClick={() => setShowAddForm(true)}
          >
            Add Your First Item
          </button>
        </div>
      ) : (
        <div className="items-grid">
          {filteredItems.map((item) => (
            <InventoryItem
              key={item._id}
              item={item}
              onDelete={handleDelete}
              onUseItem={handleUseItem}
              onReorder={handleReorderItem}
            />
          ))}
        </div>
      )}

      {showAddForm && (
        <AddItemForm
          onAddItem={handleAddItem}
          onCancel={() => setShowAddForm(false)}
        />
      )}
    </div>
  );
};

export default InventoryList;
