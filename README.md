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
