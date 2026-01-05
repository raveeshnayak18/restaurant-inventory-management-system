# Restaurant Inventory Management - API Documentation

## Base URL
```
http://localhost:5000/api
```

## Endpoints

---

## 1. Health Check
Check if the server is running.

### Request
```http
GET /health
```

### Response
```json
{
  "success": true,
  "message": "Server is running"
}
```

---

## 2. Get All Inventory Items
Retrieve all inventory items from the database.

### Request
```http
GET /inventory
```

### Response (200 OK)
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "itemName": "Basmati Rice",
      "category": "Grains",
      "quantityAvailable": 100,
      "unitOfMeasurement": "kg",
      "reorderLevel": 20,
      "stockStatus": "Available",
      "createdAt": "2026-01-04T10:00:00.000Z",
      "updatedAt": "2026-01-04T10:00:00.000Z"
    },
    {
      "_id": "507f1f77bcf86cd799439012",
      "itemName": "Olive Oil",
      "category": "Oils",
      "quantityAvailable": 12,
      "unitOfMeasurement": "liters",
      "reorderLevel": 15,
      "stockStatus": "Low Stock",
      "createdAt": "2026-01-04T10:05:00.000Z",
      "updatedAt": "2026-01-04T10:05:00.000Z"
    }
  ],
  "message": "All inventory items retrieved successfully"
}
```

### cURL Example
```bash
curl http://localhost:5000/api/inventory
```

---

## 3. Get Single Inventory Item
Retrieve a specific inventory item by ID.

### Request
```http
GET /inventory/:id
```

### Parameters
- `id` (string, required) - MongoDB ObjectId of the item

### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "itemName": "Basmati Rice",
    "category": "Grains",
    "quantityAvailable": 100,
    "unitOfMeasurement": "kg",
    "reorderLevel": 20,
    "stockStatus": "Available",
    "createdAt": "2026-01-04T10:00:00.000Z",
    "updatedAt": "2026-01-04T10:00:00.000Z"
  },
  "message": "Inventory item retrieved successfully"
}
```

### Response (404 Not Found)
```json
{
  "success": false,
  "message": "Inventory item not found"
}
```

### cURL Example
```bash
curl http://localhost:5000/api/inventory/507f1f77bcf86cd799439011
```

---

## 4. Create New Inventory Item
Add a new item to the inventory.

### Request
```http
POST /inventory
Content-Type: application/json
```

### Request Body
```json
{
  "itemName": "Olive Oil",
  "category": "Oils",
  "quantityAvailable": 50,
  "unitOfMeasurement": "liters",
  "reorderLevel": 10
}
```

### Response (201 Created)
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "itemName": "Olive Oil",
    "category": "Oils",
    "quantityAvailable": 50,
    "unitOfMeasurement": "liters",
    "reorderLevel": 10,
    "stockStatus": "Available",
    "createdAt": "2026-01-04T10:30:00.000Z",
    "updatedAt": "2026-01-04T10:30:00.000Z"
  },
  "message": "Inventory item created successfully"
}
```

### Response (400 Bad Request)
```json
{
  "success": false,
  "message": "Please provide all required fields"
}
```

### Field Descriptions
| Field | Type | Required | Enum Values |
|-------|------|----------|-------------|
| itemName | string | Yes | N/A |
| category | string | Yes | Grains, Vegetables, Dairy, Beverages, Spices, Oils |
| quantityAvailable | number | Yes | 0 or positive |
| unitOfMeasurement | string | Yes | kg, liters, packets, pieces, grams, ml |
| reorderLevel | number | Yes | 0 or positive |

### cURL Example
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

---

## 5. Update Inventory (Use/Consume Items)
Reduce the quantity of an item when it's used in the restaurant.

### Request
```http
POST /inventory/updateInventory
Content-Type: application/json
```

### Request Body
```json
{
  "itemName": "Basmati Rice",
  "quantityUsed": 5
}
```

### Response (200 OK)
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
  "message": "Inventory updated successfully. Basmati Rice quantity reduced by 5 kg"
}
```

### Response - Low Stock (200 OK)
```json
{
  "success": true,
  "data": {
    "itemName": "Olive Oil",
    "quantityUsed": 8,
    "previousQuantity": 12,
    "updatedQuantity": 4,
    "unitOfMeasurement": "liters",
    "stockStatus": "Low Stock",
    "reorderLevel": 15
  },
  "message": "Inventory updated successfully. Olive Oil quantity reduced by 8 liters"
}
```

### Response (404 Not Found)
```json
{
  "success": false,
  "message": "Inventory item not found"
}
```

### Response (400 Bad Request - Insufficient Stock)
```json
{
  "success": false,
  "message": "Insufficient quantity. Available: 50 kg, Requested: 60 kg"
}
```

### cURL Example
```bash
curl -X POST http://localhost:5000/api/inventory/updateInventory \
  -H "Content-Type: application/json" \
  -d '{
    "itemName": "Basmati Rice",
    "quantityUsed": 5
  }'
```

---

## 6. Update Inventory Item Details
Update any details of an existing inventory item.

### Request
```http
PUT /inventory/:id
Content-Type: application/json
```

### Parameters
- `id` (string, required) - MongoDB ObjectId of the item

### Request Body (all fields optional)
```json
{
  "itemName": "Jasmine Rice",
  "quantityAvailable": 110,
  "reorderLevel": 25
}
```

### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "itemName": "Jasmine Rice",
    "category": "Grains",
    "quantityAvailable": 110,
    "unitOfMeasurement": "kg",
    "reorderLevel": 25,
    "stockStatus": "Available",
    "createdAt": "2026-01-04T10:00:00.000Z",
    "updatedAt": "2026-01-04T10:45:00.000Z"
  },
  "message": "Inventory item updated successfully"
}
```

### Response (404 Not Found)
```json
{
  "success": false,
  "message": "Inventory item not found"
}
```

### cURL Example
```bash
curl -X PUT http://localhost:5000/api/inventory/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "quantityAvailable": 110,
    "reorderLevel": 25
  }'
```

---

## 7. Delete Inventory Item
Remove an item from the inventory.

### Request
```http
DELETE /inventory/:id
```

### Parameters
- `id` (string, required) - MongoDB ObjectId of the item

### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "itemName": "Basmati Rice",
    "category": "Grains",
    "quantityAvailable": 100,
    "unitOfMeasurement": "kg",
    "reorderLevel": 20,
    "stockStatus": "Available",
    "createdAt": "2026-01-04T10:00:00.000Z",
    "updatedAt": "2026-01-04T10:00:00.000Z"
  },
  "message": "Inventory item deleted successfully"
}
```

### Response (404 Not Found)
```json
{
  "success": false,
  "message": "Inventory item not found"
}
```

### cURL Example
```bash
curl -X DELETE http://localhost:5000/api/inventory/507f1f77bcf86cd799439011
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Error message describing what went wrong"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Inventory item not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal Server Error",
  "error": "Error details"
}
```

---

## Stock Status Values

The `stockStatus` field automatically updates based on quantity:

| Status | Condition |
|--------|-----------|
| Available | `quantityAvailable > reorderLevel` |
| Low Stock | `quantityAvailable <= reorderLevel` |
| Out of Stock | `quantityAvailable === 0` |

---

## Categories & Units

### Valid Categories
- Grains
- Vegetables
- Dairy
- Beverages
- Spices
- Oils

### Valid Units of Measurement
- kg (kilograms)
- liters
- packets
- pieces
- grams
- ml (milliliters)

---

## Complete Workflow Example

### 1. Create Item
```bash
curl -X POST http://localhost:5000/api/inventory \
  -H "Content-Type: application/json" \
  -d '{
    "itemName": "Tomatoes",
    "category": "Vegetables",
    "quantityAvailable": 50,
    "unitOfMeasurement": "kg",
    "reorderLevel": 10
  }'
```

### 2. View All Items
```bash
curl http://localhost:5000/api/inventory
```

### 3. Use Some Items
```bash
curl -X POST http://localhost:5000/api/inventory/updateInventory \
  -H "Content-Type: application/json" \
  -d '{
    "itemName": "Tomatoes",
    "quantityUsed": 8
  }'
```

### 4. Get Updated Item
```bash
curl http://localhost:5000/api/inventory/inventory/<id>
```

### 5. Delete Item
```bash
curl -X DELETE http://localhost:5000/api/inventory/<id>
```

---

## Response Time

Typical response times:
- GET requests: 50-200ms
- POST/PUT requests: 100-300ms
- DELETE requests: 50-150ms

(Depends on MongoDB Atlas network latency)

---

## Pagination (Future Enhancement)

Currently, all items are returned. For large datasets, add pagination:
```
GET /inventory?page=1&limit=10
```

---

## Rate Limiting (Future Enhancement)

Consider implementing rate limiting:
- 100 requests per minute per IP address

---

## Authentication (Future Enhancement)

For production, consider adding:
- JWT authentication
- API key validation
- Role-based access control (staff, manager, admin)

---

**Last Updated**: January 4, 2026
**API Version**: 1.0
