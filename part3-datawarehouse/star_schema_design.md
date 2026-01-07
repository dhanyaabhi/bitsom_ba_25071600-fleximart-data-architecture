
# Star Schema Design Documentation
# This star schema supports efficient OLAP analysis.

## Section 1: Schema Overview

### Fact Table: fact_sales
**Grain:** One row per product per order line item  
**Business Process:** Sales transactions  

**Measures (Numeric Facts):**
- quantity_sold: Number of units sold
- unit_price: Price per unit at the time of sale
- discount_amount: Discount applied
- total_amount: Final amount (quantity × unit_price − discount)

**Foreign Keys:**
- date_key → dim_date
- product_key → dim_product
- customer_key → dim_customer

---

### Dimension Table: dim_date
**Purpose:** Date dimension for time-based analysis  
**Type:** Conformed dimension  

**Attributes:**
- date_key (PK): Surrogate key (YYYYMMDD)
- full_date: Actual date
- day_of_week: Monday, Tuesday, etc.
- day_of_month: 1–31
- month: 1–12
- month_name: January, February, etc.
- quarter: Q1, Q2, Q3, Q4
- year: 2023, 2024, etc.
- is_weekend: Boolean

---

### Dimension Table: dim_product
**Purpose:** Product details for sales analysis  
**Type:** Conformed dimension  

**Attributes:**
- product_key (PK): Surrogate key
- product_id: Source system product ID
- product_name: Name of the product
- category: Product category
- subcategory: Product subcategory
- unit_price: Standard unit price

---

### Dimension Table: dim_customer
**Purpose:** Customer details for sales analysis  
**Type:** Conformed dimension  

**Attributes:**
- customer_key (PK): Surrogate key
- customer_id: Source system customer ID
- customer_name: Full name of the customer
- city: City
- state: State
- customer_segment: Retail, Corporate, etc.

---

## Section 2: Design Decisions

The fact_sales table is designed at the transaction line-item level, where each row represents one product sold in a single order. This granularity enables detailed analysis at the product, customer, and time levels, while also supporting aggregation for monthly, quarterly, and yearly reporting.

Surrogate keys are used instead of natural keys to ensure data consistency and historical accuracy. Changes in customer or product attributes do not affect previously recorded facts, preserving historical sales analysis.

This star schema supports drill-down and roll-up operations efficiently. Users can drill down from year to month to day, or roll up sales from product level to category and subcategory. The design enables fast querying, slicing, and dicing for business intelligence reporting.

---

## Section 3: Sample Data Flow

**Source Transaction:**
Order #101, Customer John Doe, Product Laptop, Qty 2, Price 50000

**fact_sales:**
- date_key: 20240115
- product_key: 5
- customer_key: 12
- quantity_sold: 2
- unit_price: 50000
- discount_amount: 0
- total_amount: 100000

**dim_date:**
- date_key: 20240115
- full_date: 2024-01-15
- month: 1
- quarter: Q1
- year: 2024

**dim_product:**
- product_key: 5
- product_name: Laptop
- category: Electronics
- subcategory: Computers
- unit_price: 50000

**dim_customer:**
- customer_key: 12
- customer_name: John Doe
- city: Mumbai
- state: Maharashtra
- customer_segment: Retail
