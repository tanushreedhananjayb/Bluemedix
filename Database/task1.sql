-- Step 1: Create Database
CREATE DATABASE IF NOT EXISTS PharmacyDB;
USE PharmacyDB;

-- Step 2: Create Users Table
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15),
    address TEXT,
    user_type ENUM('customer', 'admin', 'pharmacist') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Step 3: Create Medicines Table
CREATE TABLE Medicines (
    medicine_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT NOT NULL,
    manufacturer VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Step 4: Create Orders Table
CREATE TABLE Orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(10,2),
    status ENUM('pending', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Step 5: Create Order Details Table (Many-to-Many Relationship)
CREATE TABLE Order_Details (
    order_detail_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    medicine_id INT,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id),
    FOREIGN KEY (medicine_id) REFERENCES Medicines(medicine_id)
);

-- Step 6: Create Payments Table
CREATE TABLE Payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    amount DECIMAL(10,2),
    payment_method ENUM('credit_card', 'debit_card', 'cash', 'UPI'),
    payment_status ENUM('pending', 'completed', 'failed'),
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id)
);

-- Step 7: Insert Sample Data
INSERT INTO Users (name, email, phone, address, user_type)
VALUES
('John Doe', 'john@example.com', '9876543210', '123 Street, City', 'customer'),
('Admin User', 'admin@example.com', '1234567890', 'Admin HQ', 'admin');

INSERT INTO Medicines (name, category, price, stock_quantity, manufacturer)
VALUES
('Paracetamol', 'Pain Relief', 50.00, 100, 'XYZ Pharma'),
('Ibuprofen', 'Pain Relief', 80.00, 150, 'ABC Pharma');

INSERT INTO Orders (user_id, total_amount, status)
VALUES
(1, 100.00, 'pending');

INSERT INTO Order_Details (order_id, medicine_id, quantity, price)
VALUES
(1, 1, 2, 50.00);

INSERT INTO Payments (order_id, amount, payment_method, payment_status)
VALUES
(1, 100.00, 'credit_card', 'completed');

-- Step 8: Retrieve Top-Selling Medicines per Region
SELECT m.name AS Medicine, u.address AS Region, SUM(od.quantity) AS Total_Sold
FROM Order_Details od
JOIN Medicines m ON od.medicine_id = m.medicine_id
JOIN Orders o ON od.order_id = o.order_id
JOIN Users u ON o.user_id = u.user_id
GROUP BY m.name, u.address
ORDER BY Total_Sold DESC
LIMIT 10;


-- Step 9: Calculate Inventory Turnover Rate
SELECT m.name AS Medicine, 
       SUM(od.quantity) / (m.stock_quantity + SUM(od.quantity)) AS Turnover_Rate
FROM Order_Details od
JOIN Medicines m ON od.medicine_id = m.medicine_id
GROUP BY m.name;

-- Step 10: Identify Frequent Customers
SELECT u.user_id, u.name, COUNT(o.order_id) AS Order_Count
FROM Users u
JOIN Orders o ON u.user_id = o.user_id
GROUP BY u.user_id
ORDER BY Order_Count DESC
LIMIT 5;

-- Step 11: Optimize Query Performance using EXPLAIN ANALYZE
EXPLAIN ANALYZE 
SELECT m.name AS Medicine, u.address AS Region, SUM(od.quantity) AS Total_Sold
FROM Order_Details od
JOIN Medicines m ON od.medicine_id = m.medicine_id
JOIN Orders o ON od.order_id = o.order_id
JOIN Users u ON o.user_id = u.user_id
GROUP BY m.name, u.address
ORDER BY Total_Sold DESC
LIMIT 10;

-- Step 12: Create Database Backup
-- Run this command in CLI (Not in MySQL)
-- mysqldump -u root -p PharmacyDB > pharmacy_backup.sql

-- Step 13: Restore Database from Backup
-- Run this in CLI (Not in MySQL)
-- mysql -u root -p PharmacyDB < pharmacy_backup.sql

-- Step 14: Set Up User-Based Access Control
CREATE USER 'pharmacist'@'localhost' IDENTIFIED BY 'password123';
GRANT SELECT, INSERT, UPDATE ON PharmacyDB.* TO 'pharmacist'@'localhost';

CREATE USER 'admin'@'localhost' IDENTIFIED BY 'adminpass';
GRANT ALL PRIVILEGES ON PharmacyDB.* TO 'admin'@'localhost';

SHOW GRANTS FOR 'pharmacist'@'localhost';

