// mongodb_operations.js
// MongoDB Operations for products collection

const { MongoClient } = require("mongodb");

// 1. MongoDB connection setup
const url = "mongodb://localhost:27017"; // Change if your MongoDB is remote
const dbName = "product_catalog";             // Change to your DB name

async function main() {
    const client = new MongoClient(url);

    try {
        await client.connect();
        console.log("Connected to MongoDB");

        const db = client.db(dbName);
        const products = db.collection("products");

        // -------------------------
        // Operation 1: Load Data
        // -------------------------
        // Compass: ADD DATA → Import JSON
        

        // -------------------------
        // Operation 2: Basic Query
        // Find Electronics products with price < 50000
        // Return: name, price, stock
        // -------------------------
        const basicQuery = await products.find(
            { category: "Electronics", price: { $lt: 50000 } },
            { projection: { name: 1, price: 1, stock: 1, _id: 0 } }
        ).toArray();
        console.log("Basic Query:", basicQuery);

        // -------------------------
        // Operation 3: Review Analysis
        // Products with average rating >= 4
        // -------------------------
        const reviewAnalysis = await products.aggregate([
            { $unwind: "$reviews" },
            { $group: { 
                _id: "$_id",
                name: { $first: "$name" },
                avgRating: { $avg: "$reviews.rating" }
            }},
            { $match: { avgRating: { $gte: 4 } } },
            { $project: { _id: 0, name: 1, avgRating: 1 } }
        ]).toArray();
        console.log("Review Analysis:", reviewAnalysis);

        // -------------------------
        // Operation 4: Update Operation
        // Add review to product ELEC001
        // -------------------------
        await products.updateOne(
            { product_id: "ELEC001" },
            { $push: { reviews: { user: "U999", rating: 4, comment: "Good value", date: new Date() } } }
        );
        console.log("Added new review to ELEC001");

        // -------------------------
        // Operation 5: Complex Aggregation
        // Average price by category, product count, sorted descending
        // -------------------------
        const avgPriceByCategory = await products.aggregate([
            { $group: {
                _id: "$category",
                avg_price: { $avg: "$price" },
                product_count: { $sum: 1 }
            }},
            { $project: { _id: 0, category: "$_id", avg_price: 1, product_count: 1 } },
            { $sort: { avg_price: -1 } }
        ]).toArray();
        console.log("Average Price by Category:", avgPriceByCategory);

    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
        console.log("Disconnected from MongoDB");
    }
}

main();
