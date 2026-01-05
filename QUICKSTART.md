# Quick Start Guide

## 🚀 Fastest Way to Run the Project

### Step 1: Install Dependencies

**Backend Setup (Terminal 1):**
```bash
cd server
npm install
```

**Frontend Setup (Terminal 2):**
```bash
cd client
npm install
```

### Step 2: Start the Servers

**Start Backend (in Terminal 1):**
```bash
cd server
npm start
```

You should see:
```
MongoDB Connected: restaurant-inventory.pm5d1ny.mongodb.net
Server running on http://localhost:5000
```

**Start Frontend (in Terminal 2):**
```bash
cd client
npm run dev
```

You should see:
```
VITE v... ready in XXX ms

➜  Local:   http://localhost:5173/
```

### Step 3: Open the Application

Open your browser and go to: **http://localhost:5173**

## 📋 What You Can Do

1. **View Inventory**: All items will be displayed in the main dashboard
2. **Search Items**: Use the search bar to find items by name
3. **Filter by Category**: Click category buttons to filter items
4. **Add New Items**: Click "Add New Item" button to add inventory
5. **Use Items**: Click "Use Item" on any item to reduce stock
6. **Monitor Stock**: Get automatic warnings for low stock items
7. **Delete Items**: Remove items from inventory when needed

## 🔍 Test the API Directly

### Check Server Health
```bash
curl http://localhost:5000/api/health
```

### Get All Items
```bash
curl http://localhost:5000/api/inventory
```

### Add a New Item
```bash
curl -X POST http://localhost:5000/api/inventory \
  -H "Content-Type: application/json" \
  -d '{
    "itemName": "Basmati Rice",
    "category": "Grains",
    "quantityAvailable": 100,
    "unitOfMeasurement": "kg",
    "reorderLevel": 20
  }'
```

### Update Inventory (Use Items)
```bash
curl -X POST http://localhost:5000/api/inventory/updateInventory \
  -H "Content-Type: application/json" \
  -d '{
    "itemName": "Basmati Rice",
    "quantityUsed": 10
  }'
```

## 📊 MongoDB Connection

The application uses MongoDB Atlas with the provided credentials. The database will:
- Automatically create collections when needed
- Store all inventory items
- Maintain automatic timestamps
- Update stock status in real-time

## ⚠️ Common Issues

### Port Already in Use
- Backend: Change `PORT` in `.env` file
- Frontend: Vite will prompt for a different port automatically

### MongoDB Connection Failed
- Check your internet connection
- Verify MongoDB Atlas IP whitelist includes your IP
- Ensure the `.env` file has the correct MONGO_URI

### CORS Errors
- Ensure both servers are running
- Frontend should connect to `http://localhost:5000`

## 🎯 Demo Features

### Low Stock Warning
When quantity falls below reorder level:
- Yellow warning box appears
- Status badge shows "Low Stock"
- Card gets highlighted

### Out of Stock Alert
When quantity reaches 0:
- Red alert box appears
- Status badge shows "Out of Stock"
- "Use Item" button is disabled
- Card gets slightly faded

### Statistics Dashboard
Real-time statistics showing:
- Total inventory items
- Available items
- Low stock items
- Out of stock items

---

**Enjoy managing your restaurant inventory!** 🍽️
