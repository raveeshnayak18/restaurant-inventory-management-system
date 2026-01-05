#!/bin/bash

# Restaurant Inventory Management System - Setup Verification Script
# This script verifies that all project files are in place

echo "================================================"
echo "Restaurant Inventory Management System"
echo "Setup Verification"
echo "================================================"
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Counter
total=0
passed=0

# Function to check file exists
check_file() {
  local file=$1
  local description=$2
  ((total++))
  
  if [ -f "$file" ]; then
    echo -e "${GREEN}✓${NC} $description"
    ((passed++))
  else
    echo -e "${RED}✗${NC} $description (NOT FOUND)"
  fi
}

# Function to check directory exists
check_dir() {
  local dir=$1
  local description=$2
  ((total++))
  
  if [ -d "$dir" ]; then
    echo -e "${GREEN}✓${NC} $description"
    ((passed++))
  else
    echo -e "${RED}✗${NC} $description (NOT FOUND)"
  fi
}

echo "Checking Directory Structure..."
echo "==============================="
check_dir "client" "Frontend directory (client/)"
check_dir "server" "Backend directory (server/)"
check_dir "client/src" "React source directory"
check_dir "server/config" "Server configuration directory"
check_dir "server/models" "Mongoose models directory"
check_dir "server/routes" "Express routes directory"
echo ""

echo "Checking Backend Files..."
echo "========================="
check_file "server/server.js" "Main Express server file"
check_file "server/config/db.js" "MongoDB connection configuration"
check_file "server/models/InventoryItem.js" "Mongoose schema and model"
check_file "server/routes/inventoryRoutes.js" "API routes and endpoints"
check_file "server/.env" "Environment variables (.env)"
check_file "server/package.json" "Server package configuration"
echo ""

echo "Checking Frontend Files..."
echo "=========================="
check_file "client/src/App.jsx" "Main React App component"
check_file "client/src/App.css" "App styling"
check_file "client/src/index.css" "Global styles"
check_file "client/src/main.jsx" "React entry point"
check_file "client/src/api/inventoryAPI.js" "API service module"
echo ""

echo "Checking React Components..."
echo "============================"
check_file "client/src/components/InventoryList.jsx" "Main inventory list component"
check_file "client/src/components/InventoryItem.jsx" "Individual inventory item component"
check_file "client/src/components/AddItemForm.jsx" "Add item form component"
echo ""

echo "Checking Component Styles..."
echo "============================="
check_file "client/src/styles/InventoryList.css" "Inventory list styling"
check_file "client/src/styles/InventoryItem.css" "Inventory item styling"
check_file "client/src/styles/AddItemForm.css" "Add form styling"
echo ""

echo "Checking Documentation..."
echo "========================="
check_file "README.md" "Main documentation"
check_file "QUICKSTART.md" "Quick start guide"
check_file "PROJECT_SUMMARY.md" "Project summary"
check_file "API_DOCUMENTATION.md" "API documentation"
echo ""

echo "Checking Dependencies..."
echo "========================"
check_file "client/package.json" "Client dependencies (package.json)"
check_file "server/package.json" "Server dependencies (package.json)"
echo ""

# Check if node_modules exist
echo "Checking Installation Status..."
echo "==============================="
if [ -d "client/node_modules" ]; then
  echo -e "${GREEN}✓${NC} Client dependencies installed"
  ((passed++))
else
  echo -e "${YELLOW}!${NC} Client dependencies not installed (run 'cd client && npm install')"
fi
((total++))

if [ -d "server/node_modules" ]; then
  echo -e "${GREEN}✓${NC} Server dependencies installed"
  ((passed++))
else
  echo -e "${YELLOW}!${NC} Server dependencies not installed (run 'cd server && npm install')"
fi
((total++))

echo ""
echo "================================================"
echo "Summary: $passed/$total checks passed"
echo "================================================"
echo ""

if [ $passed -eq $total ]; then
  echo -e "${GREEN}✓ All checks passed!${NC}"
  echo ""
  echo "Your Restaurant Inventory Management System is ready!"
  echo ""
  echo "Next steps:"
  echo "1. Install dependencies (if not already done):"
  echo "   cd client && npm install"
  echo "   cd ../server && npm install"
  echo ""
  echo "2. Start the backend (Terminal 1):"
  echo "   cd server && npm start"
  echo ""
  echo "3. Start the frontend (Terminal 2):"
  echo "   cd client && npm run dev"
  echo ""
  echo "4. Open your browser to http://localhost:5173"
  exit 0
else
  missing=$((total - passed))
  echo -e "${RED}✗ $missing file(s) missing${NC}"
  echo ""
  echo "Please check the missing files above."
  exit 1
fi
