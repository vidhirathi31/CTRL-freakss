CREATE DATABASE portfolio_db;

USE portfolio_db;

CREATE TABLE portfolio_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    stockTicker VARCHAR(10) NOT NULL,
    volume INT NOT NULL,
    type VARCHAR(20) NOT NULL,  -- E.g., Stock, Bond, Cash, etc.
    price DECIMAL(10, 2) NOT NULL  -- Price per stock/bond
);

SELECT * FROM users;
describe users;
INSERT INTO users (name, email, contact,createdAt, updatedAt) VALUES 
('John Doe', 'john@example.com', '1234567890','2025-05-24','2025-08-06'),
('Kunika Bhutada','kunika@mail.com','9822372218','2025-06-14','2025-08-06');

INSERT INTO assets (assetName, currentValue, quantity, totalValue, createdAt, updatedAt, userId) VALUES
('AAPL', 175.32, 10.0, 1753.20, '2023-01-15 11:20:00', '2023-08-06 14:10:00', 1),
('Gold', 1800.50, 2.0, 3601.00, '2023-02-20 13:45:00', '2023-08-06 14:15:00', 1),
('Savings', 1.00, 5000.0, 5000.00, '2023-03-10 09:30:00', '2023-08-06 14:20:00', 1),
('MSFT', 330.12, 5.0, 1650.60, '2023-01-20 10:15:00', '2023-08-06 15:10:00', 2),
('Property', 250000.00, 1.0, 250000.00, '2022-11-15 14:00:00', '2023-08-06 15:30:00', 2);

-- Transactions table data
INSERT INTO transactions (tDate, type, quantity, pricePerUnit, purchasePrice, createdAt, updatedAt, assetId) VALUES
('2023-01-15 11:25:00', 'buy', 10.0, 175.32, 1753.20, '2023-01-15 11:25:00', '2023-01-15 11:25:00', 1),
('2023-02-20 13:50:00', 'buy', 2.0, 1800.50, 3601.00, '2023-02-20 13:50:00', '2023-02-20 13:50:00', 2),
('2023-03-10 09:35:00', 'buy', 5000.0, 1.00, 5000.00, '2023-03-10 09:35:00', '2023-03-10 09:35:00', 3),
('2023-01-20 10:20:00', 'buy', 5.0, 330.12, 1650.60, '2023-01-20 10:20:00', '2023-01-20 10:20:00', 4),
('2022-11-15 14:05:00', 'buy', 1.0, 250000.00, 250000.00, '2022-11-15 14:05:00', '2022-11-15 14:05:00', 5);
