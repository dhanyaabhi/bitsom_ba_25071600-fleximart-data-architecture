
# Database Schema Documentation

## 1. Entity-Relationship Description (Text Format)

### ENTITY: `customers`
**Purpose:** Stores customer information.  
**Attributes:**  
- `customer_id`: Unique identifier (**Primary Key**, auto-increment)  
- `first_name`: Customer's first name (**Not Null**)  
- `last_name`: Customer's last name (**Not Null**)  
- `email`: Customer's email (**Unique, Not Null**)  
- `phone`: Customer's phone number  
- `city`: Customer's city  
- `registration_date`: Date the customer registered  

**Relationships:**  
- One customer can place **MANY orders** (1:M with `orders` table)

### ENTITY: `products`
**Purpose:** Stores product information.  
**Attributes:**  
- `product_id`: Unique identifier (**Primary Key**, auto-increment)  
- `product_name`: Name of the product (**Not Null**)  
- `category`: Product category (**Not Null**)  
- `price`: Product price (**Not Null**)  
- `stock_quantity`: Number of items available (**Default 0**)  

**Relationships:**  
- One product can appear in **MANY order items** (1:M with `order_items`)

### ENTITY: `orders`
**Purpose:** Stores customer orders.  
**Attributes:**  
- `order_id`: Unique identifier (**Primary Key**, auto-increment)  
- `customer_id`: References `customers.customer_id` (**Foreign Key**)  
- `order_date`: Date of order (**Not Null**)  
- `total_amount`: Total value of the order (**Not Null**)  
- `status`: Order status (Default = 'Pending')  

**Relationships:**  
- Each order belongs to **ONE customer** (M:1 with `customers`)  
- One order can include **MANY order items** (1:M with `order_items`)

### ENTITY: `order_items`
**Purpose:** Stores individual product items within an order.  
**Attributes:**  
- `order_item_id`: Unique identifier (**Primary Key**, auto-increment)  
- `order_id`: References `orders.order_id` (**Foreign Key**)  
- `product_id`: References `products.product_id` (**Foreign Key**)  
- `quantity`: Number of units ordered (**Not Null**)  
- `unit_price`: Price per unit at time of order (**Not Null**)  
- `subtotal`: Total price for this line item (`quantity * unit_price`)  

**Relationships:**  
- Each `order_item` belongs to **ONE order** and references **ONE product**

## 2. Normalization Explanation

This database design is in **Third Normal Form (3NF)** for the following reasons:

1. **1NF:** All tables contain atomic values.  
2. **2NF:** All non-key attributes fully depend on the primary key.  
3. **3NF:** No transitive dependencies exist.  

**Functional Dependencies:**  
- `customers`: `customer_id → first_name, last_name, email, phone, city, registration_date`  
- `products`: `product_id → product_name, category, price, stock_quantity`  
- `orders`: `order_id → customer_id, order_date, total_amount, status`  
- `order_items`: `order_item_id → order_id, product_id, quantity, unit_price, subtotal`  

**Anomaly Prevention:**  
- **Update Anomaly:** Data stored in one place only.  
- **Insert Anomaly:** Orders cannot be added without valid customer.  
- **Delete Anomaly:** Deleting an order does not delete customers or products.

## 3. Sample Data Representation

customers

| customer_id | first_name | last_name | email                    | phone           | city       | registration_date |
|-------------|------------|-----------|--------------------------|-----------------|------------|-------------------|
| 1           | Rahul      | Sharma    | rahul.sharma@gmail.com   | +91-9876543210  | Bangalore  | 2023-01-15        |
| 2           | Priya      | Patel     | priya.patel@yahoo.com    | +91-9988776655  | Mumbai     | 2023-02-20        |
| 3           | Sneha      | Reddy     | sneha.reddy@gmail.com    | +91-9123456789  | Hyderabad  | 2023-04-15        |


products

| product_id | product_name       | category    | price    | stock_quantity |
| ---------- | ------------------ | ----------- | -------- | -------------- |
| 1          | Samsung Galaxy S21 | Electronics | 45999.00 | 150            |
| 2          | Nike Running Shoes | Fashion     | 3499.00  | 80             |
| 3          | Levi's Jeans       | Fashion     | 2999.00  | 120            |


orders

| order_id | customer_id | order_date | total_amount | status  |
| -------- | ----------- | ---------- | ------------ | ------- |
| 1        | 1           | 2024-01-15 | 45999.00     | Pending |
| 2        | 2           | 2024-01-16 | 5998.00      | Pending |
| 3        | 4           | 2024-01-20 | 1950.00      | Pending |


order_items

| order_item_id | order_id | product_id | quantity | unit_price | subtotal |
| ------------- | -------- | ---------- | -------- | ---------- | -------- |
| 1             | 1        | 1          | 1        | 45999.00   | 45999.00 |
| 2             | 2        | 3          | 2        | 2999.00    | 5998.00  |
| 3             | 3        | 8          | 3        | 650.00     | 1950.00  |

