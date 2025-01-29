const mongoose = require('mongoose');

// Product Schema Definition
// This schema defines the structure for the Product document in the MongoDB database.
// It includes the following fields:
// - title: The name of the product (required, must be a string).
// - quantity: The available quantity of the product (required, defaults to 0, stored as a string).
// - price: The price of the product (required, defaults to 0, must be a number).
// - image: An optional URL string for the product image.
// - timestamps: Automatically adds 'createdAt' and 'updatedAt' fields to track when the document is created or modified.

const ProductSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please enter product name'],
        },
        quantity: {
            type: String,
            required: true,
            default: 0,
        },
        price: {
            type: Number,
            required: true,
            default: 0
        },
        image: {
            type: String,
            required: false
        },
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;