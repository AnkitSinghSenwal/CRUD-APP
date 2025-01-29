const express = require('express');
const mongoose = require('mongoose');
const productRoute = require('./routes/product.route.js');

const app = express();

require('dotenv').config();
const port = process.env.PORT;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
// console.log( port, username, password);

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//routes
app.use('/api/products', productRoute);

// database connection  
mongoose.connect(`mongodb+srv://${username}:${password}@nodeapi.2qisd.mongodb.net/NodeApi?retryWrites=true&w=majority&appName=NodeApi`)
    .then(() => {
        console.log('connected to mongodb...')

        app.listen(port, () => {
            console.log("Server is running on port 3000...")
        });
    })
    .catch((err) => console.error('Error:', err.message));

// Root Endpoint
// This endpoint serves as the entry point of the Node API.
// It responds with a simple message to confirm the server is running and accessible.
app.get('/', (req, res) => {
    res.send('Welcome to the Node API! Server is up and running.');
});

// get all product
// app.get('/api/products', async (req, res) => {
//     try {
//         const products = await Product.find({});
//         if (!products) {
//             return res.status(404).json({ message: `No products found!, products.length = ${products.length}` });
//         }        
//         res.status(200).json(products);
//     } catch (error) {
//         // console.error('Error', error.message)
//         return res.status(500).json({ message: error.message });
//     }
// });

// get a product
// app.get('/api/products/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const product = await Product.findById(id);

//         if (!product) {
//             return res.status(404).json({ message: 'Product not found!' })
//         }
//         res.status(200).json(product)

//     } catch (error) {
//         return res.status(500).json({ message: error.message })
//     }
// })

// add new product
// app.post('/api/products', async (req, res) => {
//     try {
//         const product = await Product.create(req.body)
//         res.status(200).json(product)
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// });

// Update a product
// app.put('/api/products/:id', async (req, res) => {
//     try {
//         const {id} = req.params;
//         const product = await Product.findByIdAndUpdate(id, req.body);
//         if (!product) {
//            return res.status(404).json({ message: 'Product not found!' });
//         }
//         const updatedOne = await Product.findById(id);
//         res.status(200).json(updatedOne);
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// });

// delete a product
// app.delete('/api/products/:id', async (req, res) => {
//     try{
//         const { id } = req.params;
//         const product = await Product.findByIdAndDelete(id);
//         if(!product){
//             return res.status(404).json({message: 'Product not found!'})
//         }
//         res.status(200).json({message : 'Product deleted successfully.'})
        
//     } catch (error){
//         return res.status(500).json({message: error.message});
//     }
// });