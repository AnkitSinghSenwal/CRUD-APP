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
    // res.send('Welcome to the Node API! Server is up and running.');
    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Node API</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: Arial, sans-serif;
        }

        body {
            text-align: center;
            background-color: #f4f4f4;
            padding: 20px;
        }

        .container {
            background: white;
            border: 3px solid black;
            border-radius: 10px;
            padding: 20px;
            width: 80%;
            margin: auto;
            box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
        }

        h1 {
            color: #333;
            margin-bottom: 10px;
        }

        p {
            color: #666;
            font-size: 1.1rem;
            margin-bottom: 20px;
        }

        table {
            width: 100%;
            margin-top: 20px;
            border-collapse: collapse;
            background: white;
        }

        thead {
            background-color: #333;
            color: white;
        }

        th, td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: left;
        }

        tr:nth-child(even) {
            background-color: #f9f9f9;
        }

        tr:hover {
            background-color: #f1f1f1;
        }

        th {
            text-transform: uppercase;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to the Node API! Server is up and running.</h1>
        <p>This API allows you to manage products.</p>
        
        <table>
            <thead>
                <tr>
                    <th>Method</th>
                    <th>Endpoint</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><strong>GET</strong></td>
                    <td>/products</td>
                    <td>Retrieve all products</td>
                </tr>
                <tr>
                    <td><strong>GET</strong></td>
                    <td>/products/:id</td>
                    <td>Retrieve a single product</td>
                </tr>
                <tr>
                    <td><strong>POST</strong></td>
                    <td>/products</td>
                    <td>Add a new product</td>
                </tr>
                <tr>
                    <td><strong>PUT</strong></td>
                    <td>/products/:id</td>
                    <td>Update a product</td>
                </tr>
                <tr>
                    <td><strong>DELETE</strong></td>
                    <td>/products/:id</td>
                    <td>Delete a product</td>
                </tr>
            </tbody>
        </table>
    </div>
</body>
</html>
 
    `)
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