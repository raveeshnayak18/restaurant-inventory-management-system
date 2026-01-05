const express = require("express");
const InventoryItem = require("../models/InventoryItem");
const router = express.Router();

// GET - Retrieve all inventory items
router.get("/", async (req, res) => {
  try {
    console.log("Fetching inventory items...");
    console.log(
      "MongoDB connection state:",
      require("mongoose").connection.readyState
    );
    console.log("Database name:", require("mongoose").connection.name);

    const items = await InventoryItem.find();
    console.log(`Found ${items.length} items`);
    res.status(200).json({
      success: true,
      data: items,
      message: "All inventory items retrieved successfully",
    });
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// POST - Use/consume items (must come before POST /)
router.post("/:id/use", async (req, res) => {
  try {
    console.log("POST /:id/use called with id:", req.params.id);
    const { quantityUsed } = req.body;

    // Validation
    if (quantityUsed === undefined || quantityUsed <= 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide valid quantityUsed",
      });
    }

    // Find the item by ID
    const item = await InventoryItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Inventory item not found",
      });
    }

    // Check if sufficient quantity is available
    if (item.quantityAvailable < quantityUsed) {
      return res.status(400).json({
        success: false,
        message: `Insufficient quantity. Available: ${item.quantityAvailable} ${item.unitOfMeasurement}, Requested: ${quantityUsed} ${item.unitOfMeasurement}`,
      });
    }

    // Update the quantity
    const previousQuantity = item.quantityAvailable;
    item.quantityAvailable -= quantityUsed;

    // Save the updated item (middleware will update stockStatus)
    const updatedItem = await item.save();

    res.status(200).json({
      success: true,
      data: updatedItem,
      message: `${updatedItem.itemName} quantity reduced by ${quantityUsed} ${updatedItem.unitOfMeasurement}`,
    });
  } catch (error) {
    console.error("Error in POST /:id/use:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// POST - Reorder item (increase quantity)
router.post("/:id/reorder", async (req, res) => {
  try {
    const { quantityToAdd } = req.body;

    // Validation
    if (quantityToAdd === undefined || quantityToAdd <= 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide valid quantityToAdd",
      });
    }

    // Find the item by ID
    const item = await InventoryItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Inventory item not found",
      });
    }

    // Update the quantity
    const previousQuantity = item.quantityAvailable;
    item.quantityAvailable += quantityToAdd;
    item.lastRestockedDate = new Date();

    // Save the updated item (middleware will update stockStatus)
    const updatedItem = await item.save();

    res.status(200).json({
      success: true,
      data: updatedItem,
      message: `${updatedItem.itemName} reordered successfully. Added ${quantityToAdd} ${updatedItem.unitOfMeasurement}`,
    });
  } catch (error) {
    console.error("Error in POST /:id/reorder:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// POST - Create a new inventory item
router.post("/", async (req, res) => {
  try {
    const {
      itemName,
      category,
      quantityAvailable,
      unitOfMeasurement,
      reorderLevel,
    } = req.body;

    // Validation
    if (
      !itemName ||
      !category ||
      quantityAvailable === undefined ||
      !unitOfMeasurement ||
      reorderLevel === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const newItem = new InventoryItem({
      itemName,
      category,
      quantityAvailable,
      unitOfMeasurement,
      reorderLevel,
    });

    const savedItem = await newItem.save();
    res.status(201).json({
      success: true,
      data: savedItem,
      message: "Inventory item created successfully",
    });
  } catch (error) {
    console.error("Error in POST /:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// GET - Retrieve a single inventory item by ID
router.get("/:id", async (req, res) => {
  try {
    const item = await InventoryItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Inventory item not found",
      });
    }
    res.status(200).json({
      success: true,
      data: item,
      message: "Inventory item retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// PUT - Update inventory item details
router.put("/:id", async (req, res) => {
  try {
    const {
      itemName,
      category,
      quantityAvailable,
      unitOfMeasurement,
      reorderLevel,
    } = req.body;

    const updateData = {};
    if (itemName) updateData.itemName = itemName;
    if (category) updateData.category = category;
    if (quantityAvailable !== undefined)
      updateData.quantityAvailable = quantityAvailable;
    if (unitOfMeasurement) updateData.unitOfMeasurement = unitOfMeasurement;
    if (reorderLevel !== undefined) updateData.reorderLevel = reorderLevel;

    const updatedItem = await InventoryItem.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).json({
        success: false,
        message: "Inventory item not found",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedItem,
      message: "Inventory item updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// DELETE - Remove an inventory item
router.delete("/:id", async (req, res) => {
  try {
    const deletedItem = await InventoryItem.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({
        success: false,
        message: "Inventory item not found",
      });
    }
    res.status(200).json({
      success: true,
      data: deletedItem,
      message: "Inventory item deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
