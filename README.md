# FlexiMart Data Architecture Project

**Student Name:Dhanya K R** 
**Student ID:bitsom_ba_25071600** 
**Email:dhanyakr444@gmail.com** 
**Date: 08-01-2026** 


## Project Overview

[2-3 sentences describing what you built]

## Repository Structure
├── part1-database-etl/
│   ├── etl_pipeline.py
│   ├── schema_documentation.md
│   ├── business_queries.sql
│   └── data_quality_report.txt
├── part2-nosql/
│   ├── nosql_analysis.md
│   ├── mongodb_operations.js
│   └── products_catalog.json
├── part3-datawarehouse/
│   ├── star_schema_design.md
│   ├── warehouse_schema.sql
│   ├── warehouse_data.sql
│   └── analytics_queries.sql
└── README.md

## Technologies Used

- Python 3.x, pandas, mysql-connector-python
- MySQL 8.0 / PostgreSQL 14
- MongoDB 6.0

## Setup Instructions

### Database Setup

```bash
# Create databases
mysql -u root -p -e "CREATE DATABASE fleximart;"
mysql -u root -p -e "CREATE DATABASE fleximart_dw;"

# Run Part 1 - ETL Pipeline
python part1-database-etl/etl_pipeline.py

# Run Part 1 - Business Queries
mysql -u root -p fleximart < part1-database-etl/business_queries.sql

# Run Part 3 - Data Warehouse
mysql -u root -p fleximart_dw < part3-datawarehouse/warehouse_schema.sql
mysql -u root -p fleximart_dw < part3-datawarehouse/warehouse_data.sql
mysql -u root -p fleximart_dw < part3-datawarehouse/analytics_queries.sql


### MongoDB Setup

mongosh < part2-nosql/mongodb_operations.js

## Key Learnings
This project demonstrates end-to-end data architecture skills.
The project implemented a complete ETL pipeline to extract raw CSV data, clean and transform it, and load it into MySQL tables.
JSON files were used to organize structured data for programmatic insertion and validation.
A star schema was designed for analytics, linking fact tables like orders with dimension tables like customers and products for easy querying.
This approach ensured data quality, consistency, and scalability while enabling efficient reporting and analysis

## Challenges Faced

1. During the ETL process, some MySQL tables were not updating correctly due to residual data or foreign key constraints.
to resolve this, the affected tables were safely truncated before reloading the cleaned data, ensuring that the ETL pipeline inserts fresh, consistent records.
2. Due to the AUTO_INCREMENT property in the database schema, the primary key IDs were automatically generated during each ETL run, causing the original CSV IDs to differ from the database IDs.

