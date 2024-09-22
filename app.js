// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors'); // Untuk mengizinkan permintaan CORS
// const app = express();
// const port = 3000;

// // Mengimpor file koneksi dan fungsi produk
// const connection = require('./config/db'); // Ganti dengan path yang sesuai
// const {
//   listProducts,
//   createProduct,
//   detailProduct,
//   updateProduct,
//   deleteProduct
// } = require('./routes/products');
// const orderRoutes = require('./routes/orders');

// app.use(cors()); // Menggunakan middleware CORS
// app.use(bodyParser.json());
// app.use(express.static('public')); // Melayani file statis dari folder public

// // Routes untuk products
// app.get('/products', (req, res) => {
//   listProducts((err, result) => {
//     if (err) return res.status(500).json({ error: err.message });
//     res.json(result);
//   });
// });

// app.post('/products', (req, res) => {
//   createProduct(req.body, (err, result) => {
//     if (err) return res.status(500).json({ error: err.message });
//     res.status(201).json(result);
//   });
// });

// app.get('/products/:id', (req, res) => {
//   const id = req.params.id;
//   detailProduct(id, (err, result) => {
//     if (err) {
//       if (err.message === 'Product not found') {
//         return res.status(404).json({ error: err.message });
//       }
//       return res.status(500).json({ error: err.message });
//     }
//     res.json(result);
//   });
// });

// app.put('/products/:id', (req, res) => {
//   const id = req.params.id;
//   updateProduct(id, req.body, (err, result) => {
//     if (err) return res.status(500).json({ error: err.message });
//     res.json(result);
//   });
// });

// app.delete('/products/:id', (req, res) => {
//   const id = req.params.id;
//   deleteProduct(id, (err, result) => {
//     if (err) {
//       if (err.message === 'Product not found') {
//         return res.status(404).json({ error: err.message });
//       }
//       return res.status(500).json({ error: err.message });
//     }
//     res.json(result);
//   });
// });

// // Routes untuk orders
// app.use('/orders', orderRoutes);

// // Melayani file index.html
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/public/index.html'); // Mengirimkan file HTML
// });

// // Menjalankan server
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

// Mengimpor file koneksi
const connection = require('./config/db'); 
const orderRoutes = require('./routes/orders');
const productRoutes = require('./routes/products');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); 

// Routes untuk products
app.use('/products', productRoutes); // Pastikan untuk menggunakan route produk
app.use('/orders', orderRoutes); // Menggunakan route orders

// Melayani file index.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Menjalankan server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
