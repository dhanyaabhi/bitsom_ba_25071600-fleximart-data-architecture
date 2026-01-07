Task 1: ETL Pipeline & SQL Analysis
Overview

This task implements a complete ETL pipeline, documents a normalized relational database schema, and answers business questions using SQL for FlexiMart sales data.

Task 1.1: ETL Pipeline

Extract data from customers_raw.csv, products_raw.csv, sales_raw.csv

Handle data quality issues:

Remove duplicates

Handle missing values

Standardize phone numbers, categories, and dates

Load cleaned data into MySQL/PostgreSQL tables:

customers, products, orders, order_items

Deliverables

etl_pipeline.py

data_quality_report.txt

Task 1.2: Database Schema Documentation

Entity descriptions for all tables

Relationships and normalization (3NF)

Sample data records

Deliverable

schema_documentation.md

Task 1.3: Business Queries

Customer purchase history

Product sales analysis

Monthly sales trend with running total

Deliverable

business_queries.sql