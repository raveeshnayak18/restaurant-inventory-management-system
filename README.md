# Restaurant Inventory Management System (MERN Stack)

A full-featured Restaurant Inventory Management System built with MongoDB, Express, React, and Node.js that allows staff to efficiently manage inventory items, track stock levels, and receive low-stock warnings.

## 📋 Features

### Frontend (React + Vite)
- **Inventory Display**: View all available inventory items with real-time status updates
- **Search & Filter**: Search items by name and filter by category
- **Stock Management**: Update inventory quantities with validation
- **Low-Stock Alerts**: Visual warnings when quantities fall below reorder levels
- **Statistics Dashboard**: Overview of total items, available items, low stock, and out-of-stock counts
- **Responsive Design**: Fully responsive UI for desktop and mobile devices
- **Real-time Updates**: Instant feedback on inventory changes

### Backend (Express + Node.js)
- **RESTful API**: Complete REST API for inventory management
- **POST /updateInventory**: Update inventory quantities with validation
- **Comprehensive CRUD**: Create, read, update, delete inventory items
- **Error Handling**: Robust error handling and validation
- **CORS Support**: Cross-origin resource sharing enabled

### Database (MongoDB)
- **Flexible Schema**: MongoDB schema for storing inventory details
- **Auto Status Updates**: Automatic stock status calculation based on quantity
- **Data Validation**: Built-in validation for all fields
- **Timestamps**: Track creation and modification times

## 🎯 Inventory Item Details

Each inventory item contains:
- **Item Name**: Name of the inventory item (e.g., "Basmati Rice")
- **Category**: Classification (Grains, Vegetables, Dairy, Beverages, Spices, Oils)
- **Quantity Available**: Current stock level
- **Unit of Measurement**: kg, liters, packets, pieces, grams, ml
- **Reorder Level**: Minimum quantity before reordering
- **Stock Status**: Automatically updated status (Available, Low Stock, Out of Stock)

## 📁 Project Structure

```
restaurant-inventory/
├── client/                 # React Vite Frontend
│   ├── src/
│   │   ├── api/
│   │   │   └── inventoryAPI.js     # API integration
│   │   ├── components/
│   │   │   ├── InventoryList.jsx   # Main list component
│   │   │   ├── InventoryItem.jsx   # Individual item component
│   │   │   └── AddItemForm.jsx     # Form to add new items
│   │   ├── styles/
│   │   │   ├── InventoryList.css
│   │   │   ├── InventoryItem.css
│   │   │   └── AddItemForm.css
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── server/                 # Express Backend
│   ├── config/
│   │   └── db.js          # MongoDB connection
│   ├── models/
│   │   └── InventoryItem.js  # MongoDB schema
│   ├── routes/
│   │   └── inventoryRoutes.js  # API routes
│   ├── server.js          # Main server file
│   ├── .env               # Environment variables
│   └── package.json
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (MongoDB Atlas account or local instance)

### Installation

#### 1. Clone or Navigate to the Project
```bash
cd "restaurant inventory"
```

#### 2. Setup Backend
```bash
cd server
npm install
```

#### 3. Setup Frontend
```bash
cd ../client
npm install
```

### Configuration

#### Backend Environment Variables
Create/Update `.env` file in the `server` directory:
```env
MONGO_URI=mongodb+srv://nayakraveesh0320_db_user:x8qxllriwcrc6e99@restaurant-inventory.pm5d1ny.mongodb.net/
PORT=5000
NODE_ENV=development
```

## 🏃 Running the Application

### Terminal 1 - Start Backend Server
```bash
cd server
npm start
# or for development with auto-reload:
npm run dev
```

The server will run on `http://localhost:5000`

### Terminal 2 - Start Frontend Development Server
```bash
cd client
npm run dev
```

The client will run on `http://localhost:5173` (or another port if 5173 is in use)

### Health Check
Test the backend is running:
```bash
curl http://localhost:5000/api/health
```

## 📡 API Endpoints

### Get All Inventory Items
```
GET /api/inventory
```
Returns all inventory items with their details.

### Get Single Item
```
GET /api/inventory/:id
```
Returns a specific inventory item by ID.

### Create New Item
```
POST /api/inventory
Content-Type: application/json

{
  "itemName": "Basmati Rice",
  "category": "Grains",
  "quantityAvailable": 100,
  "unitOfMeasurement": "kg",
  "reorderLevel": 20
}
```

### Update Inventory (Use/Consume Items)
```
POST /api/inventory/updateInventory
Content-Type: application/json

{
  "itemName": "Basmati Rice",
  "quantityUsed": 5
}
```

Response:
```json
{
  "success": true,
  "data": {
    "itemName": "Basmati Rice",
    "quantityUsed": 5,
    "previousQuantity": 100,
    "updatedQuantity": 95,
    "unitOfMeasurement": "kg",
    "stockStatus": "Available",
    "reorderLevel": 20
  },
  "message": "Inventory updated successfully..."
}
```

### Update Item Details
```
PUT /api/inventory/:id
Content-Type: application/json

{
  "quantityAvailable": 110,
  "reorderLevel": 25
}
```

### Delete Item
```
DELETE /api/inventory/:id
```

## 🎨 UI Features

### Inventory Item Card
- Item name and category
- Current quantity with unit of measurement
- Reorder level display
- Visual status badge (Available/Low Stock/Out of Stock)
- Low-stock warning box
- Out-of-stock alert box
- Action buttons (Use Item, Edit, Delete)

### Main Dashboard
- Statistics cards showing inventory overview
- Search functionality to find items quickly
- Category filters for browsing
- Grid layout that's responsive
- Empty state message when no items exist
- Success/Error messages for user feedback

## 🔍 Stock Status Logic

The system automatically updates stock status based on quantity:

```javascript
if (quantityAvailable === 0) {
  stockStatus = "Out of Stock"
} else if (quantityAvailable <= reorderLevel) {
  stockStatus = "Low Stock"
} else {
  stockStatus = "Available"
}
```

## 🛡️ Validation

### Backend Validation
- Item name is required
- Category must be one of the predefined options
- Quantities must be non-negative numbers
- Quantity used must not exceed available quantity
- Reorder level must be provided

### Frontend Validation
- Form validation before submission
- Quantity input restrictions (positive numbers only)
- Confirmation dialogs for delete operations
- Auto-validation on API responses

## 🔧 Technologies Used

- **Frontend**: React 18, Vite, Axios, CSS3
- **Backend**: Express.js, Node.js
- **Database**: MongoDB with Mongoose ODM
- **Other**: CORS, dotenv for environment management

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Verify the MongoDB URI in `.env` is correct
- Check MongoDB Atlas IP whitelist includes your IP
- Ensure network connectivity

### API Not Found Errors
- Confirm the backend server is running on port 5000
- Check CORS is properly configured
- Verify the API endpoint URLs in `inventoryAPI.js`

### Items Not Loading
- Check browser console for API errors
- Verify MongoDB connection in server console
- Ensure data exists in the database

## 📝 Sample Data

To add sample data, you can use the React UI to create items:

1. Click "Add New Item" button
2. Fill in the form:
   - Item Name: "Olive Oil"
   - Category: "Oils"
   - Quantity: 50
   - Unit: "liters"
   - Reorder Level: 10

Or use the API directly:
```bash
curl -X POST http://localhost:5000/api/inventory \
  -H "Content-Type: application/json" \
  -d '{
    "itemName": "Olive Oil",
    "category": "Oils",
    "quantityAvailable": 50,
    "unitOfMeasurement": "liters",
    "reorderLevel": 10
  }'
```

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1920px and above)
- Laptop (1280px - 1919px)
- Tablet (768px - 1279px)
- Mobile (below 768px)

## 🤝 Contributing

This is a project for learning and development purposes. Feel free to extend and modify the features as needed.

## 📄 License

This project is available for personal and educational use.

---

**Happy Inventory Managing!** 🍽️
