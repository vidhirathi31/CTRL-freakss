// This file can be used to store mock data during development
// You can include it in your HTML when testing without a backend
// <script src="api/mockData.js"></script>

const mockUsers = [
    { id: 1, name: "John Doe", email: "john@example.com", contact: "1234567890" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", contact: "0987654321" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", contact: "5551234567" }
];

const mockAssets = [
    { id: 1, userId: 1, assetName: "AAPL", assetType: "stock", currentValue: 175.32, quantity: 10, totalValue: 1753.20, purchaseDate: "2023-01-15" },
    { id: 2, userId: 1, assetName: "Gold", assetType: "gold", currentValue: 1800.50, quantity: 2, totalValue: 3601.00, purchaseDate: "2023-02-20" },
    { id: 3, userId: 1, assetName: "Savings", assetType: "cash", currentValue: 1, quantity: 5000, totalValue: 5000, purchaseDate: "2023-03-10" },
    { id: 4, userId: 2, assetName: "MSFT", assetType: "stock", currentValue: 330.12, quantity: 5, totalValue: 1650.60, purchaseDate: "2023-01-20" },
    { id: 5, userId: 2, assetName: "Property", assetType: "property", currentValue: 250000, quantity: 1, totalValue: 250000, purchaseDate: "2022-11-15" },
    { id: 6, userId: 3, assetName: "GOOGL", assetType: "stock", currentValue: 2850.45, quantity: 2, totalValue: 5700.90, purchaseDate: "2023-02-10" }
];