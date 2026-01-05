import React, { useState } from 'react';
import '../styles/AddItemForm.css';

const AddItemForm = ({ onAddItem, onCancel }) => {
  const [formData, setFormData] = useState({
    itemName: '',
    category: 'Grains',
    quantityAvailable: '',
    unitOfMeasurement: 'kg',
    reorderLevel: '',
  });

  const categories = ['Grains', 'Vegetables', 'Dairy', 'Beverages', 'Spices', 'Oils'];
  const units = ['kg', 'liters', 'packets', 'pieces', 'grams', 'ml'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: ['quantityAvailable', 'reorderLevel'].includes(name)
        ? parseFloat(value) || ''
        : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.itemName ||
      formData.quantityAvailable === '' ||
      formData.reorderLevel === ''
    ) {
      alert('Please fill in all fields');
      return;
    }
    onAddItem(formData);
    setFormData({
      itemName: '',
      category: 'Grains',
      quantityAvailable: '',
      unitOfMeasurement: 'kg',
      reorderLevel: '',
    });
  };

  return (
    <div className="form-overlay">
      <div className="form-container">
        <h2>Add New Inventory Item</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="itemName">Item Name *</label>
            <input
              type="text"
              id="itemName"
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              placeholder="e.g., Basmati Rice"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Category *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="unitOfMeasurement">Unit of Measurement *</label>
              <select
                id="unitOfMeasurement"
                name="unitOfMeasurement"
                value={formData.unitOfMeasurement}
                onChange={handleChange}
              >
                {units.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="quantityAvailable">Quantity Available *</label>
              <input
                type="number"
                id="quantityAvailable"
                name="quantityAvailable"
                value={formData.quantityAvailable}
                onChange={handleChange}
                placeholder="0"
                min="0"
                step="0.1"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="reorderLevel">Reorder Level *</label>
              <input
                type="number"
                id="reorderLevel"
                name="reorderLevel"
                value={formData.reorderLevel}
                onChange={handleChange}
                placeholder="0"
                min="0"
                step="0.1"
                required
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Add Item
            </button>
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItemForm;
