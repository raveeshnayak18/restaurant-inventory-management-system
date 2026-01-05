const mongoose = require("mongoose");

const inventoryItemSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ["Grains", "Vegetables", "Dairy", "Beverages", "Spices", "Oils"],
      required: true,
    },
    quantityAvailable: {
      type: Number,
      required: true,
      min: 0,
    },
    unitOfMeasurement: {
      type: String,
      enum: ["kg", "liters", "packets", "pieces", "grams", "ml"],
      required: true,
    },
    reorderLevel: {
      type: Number,
      required: true,
      min: 0,
    },
    stockStatus: {
      type: String,
      enum: ["Available", "Low Stock", "Out of Stock"],
      default: "Available",
    },
    supplier: {
      type: String,
      default: null,
    },
    price: {
      type: Number,
      default: null,
    },
    lastRestockedDate: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true, collection: "inventories", strict: false }
);

// Middleware to update stock status before saving
inventoryItemSchema.pre("save", function () {
  if (this.quantityAvailable === 0) {
    this.stockStatus = "Out of Stock";
  } else if (this.quantityAvailable <= this.reorderLevel) {
    this.stockStatus = "Low Stock";
  } else {
    this.stockStatus = "Available";
  }
});

module.exports = mongoose.model("InventoryItem", inventoryItemSchema);
