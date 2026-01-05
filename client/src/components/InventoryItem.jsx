import React from 'react';
import '../styles/InventoryItem.css';

const InventoryItem = ({ item, onDelete, onUseItem, onReorder }) => {
  const isLowStock = item.quantityAvailable <= item.reorderLevel;
  const isOutOfStock = item.quantityAvailable === 0;

  const handleUseClick = () => {
    const quantity = prompt(`Enter quantity to use (Available: ${item.quantityAvailable} ${item.unitOfMeasurement}):`);
    if (quantity && !isNaN(quantity) && quantity > 0) {
      onUseItem(item._id, parseInt(quantity));
    }
  };

  const handleReorderClick = () => {
    const quantity = prompt(`Enter quantity to reorder for ${item.itemName}:`);
    if (quantity && !isNaN(quantity) && quantity > 0) {
      onReorder(item._id, parseInt(quantity));
    }
  };

  return (
    <div className={`inventory-item ${isOutOfStock ? 'out-of-stock' : isLowStock ? 'low-stock' : 'available'}`}>
      <div className="item-header">
        <h3>{item.itemName}</h3>
        <span className={`status-badge ${item.stockStatus.toLowerCase().replace(' ', '-')}`}>
          {item.stockStatus}
        </span>
      </div>

      <div className="item-details">
        <div className="detail-row">
          <span className="label">Category:</span>
          <span className="value">{item.category}</span>
        </div>

        <div className="detail-row">
          <span className="label">Quantity:</span>
          <span className={`value ${isLowStock ? 'warning' : ''}`}>
            {item.quantityAvailable} {item.unitOfMeasurement}
          </span>
        </div>

        <div className="detail-row">
          <span className="label">Reorder Level:</span>
          <span className="value">{item.reorderLevel} {item.unitOfMeasurement}</span>
        </div>

        {isLowStock && (
          <div className="warning-box">
            ⚠️ Low Stock Warning: Available quantity is below reorder level!
          </div>
        )}

        {isOutOfStock && (
          <div className="error-box">
            ❌ Out of Stock: Please reorder immediately!
          </div>
        )}
      </div>

      <div className="item-actions">
        <button
          className="btn btn-use"
          onClick={handleUseClick}
          disabled={isOutOfStock}
        >
          Use Item
        </button>
        <button
          className="btn btn-reorder"
          onClick={handleReorderClick}
        >
          Reorder
        </button>
        <button
          className="btn btn-delete"
          onClick={() => {
            if (window.confirm(`Delete ${item.itemName}?`)) {
              onDelete(item._id);
            }
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default InventoryItem;
