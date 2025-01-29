const Product =  require("../models/product.model.js");

// get all products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        if (!products) {
            return res.status(404).json({ message: `No products found!, products.length = ${products.length}` });
        }
        res.status(200).json(products);
    } catch (error) {
        // console.error('Error', error.message)
        return res.status(500).json({ message: error.message });
    }
}

// get product by id (search)
const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found!' })
        }
        res.status(200).json(product)

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

// add new product
const addProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(201).json(product)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// update a product
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if (!product) {
            return res.status(404).json({ message: 'Product not found!' });
        }
        const updatedOne = await Product.findById(id);
        res.status(200).json(updatedOne);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// delete a product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found!' })
        }
        res.status(200).json({ message: 'Product deleted successfully.' })

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct,
}