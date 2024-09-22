// const connection = require('../config/db'); // Ganti dengan path yang sesuai

// // 1. List Products
// const listProducts = (callback) => {
//   const query = 'SELECT * FROM products';
//   connection.query(query, (err, results) => {
//     if (err) return callback(err);
//     callback(null, {
//       message: 'Product List',
//       data: results
//     });
//   });
// };

// // 2. Create Product
// const createProduct = (productData, callback) => {
//   const { name, price, stock } = productData;
//   const query = 'INSERT INTO products (name, price, stock) VALUES (?, ?, ?)';
//   connection.query(query, [name, price, stock], (err, results) => {
//     if (err) return callback(err);
//     callback(null, {
//       id: results.insertId,
//       ...productData,
//       created_at: new Date().toISOString(),
//       updated_at: new Date().toISOString()
//     });
//   });
// };

// // 3. Detail Product
// const detailProduct = (id, callback) => {
//   const query = 'SELECT * FROM products WHERE id = ?';
//   connection.query(query, [id], (err, results) => {
//     if (err) return callback(err);
//     if (results.length === 0) return callback(new Error('Product not found'));
//     callback(null, {
//       message: 'Product Detail',
//       data: results[0]
//     });
//   });
// };

// // 4. Update Product
// const updateProduct = (id, productData, callback) => {
//   const { name, price, stock } = productData;
//   let query = 'UPDATE products SET updated_at = CURRENT_TIMESTAMP';
//   const updates = [];
  
//   if (name) {
//     query += ', name = ?';
//     updates.push(name);
//   }
//   if (price) {
//     query += ', price = ?';
//     updates.push(price);
//   }
//   if (stock) {
//     query += ', stock = ?';
//     updates.push(stock);
//   }
  
//   query += ' WHERE id = ?';
//   updates.push(id);
  
//   connection.query(query, updates, (err, results) => {
//     if (err) return callback(err);
//     callback(null, {
//       message: 'Product updated successfully',
//       data: {
//         id,
//         name: name || null,
//         price: price || null,
//         stock: stock || null,
//         sold: 0,  // Assuming you want to reset sold or keep it as is
//         created_at: new Date().toISOString(),
//         updated_at: new Date().toISOString()
//       }
//     });
//   });
// };

// // 5. Delete Product
// const deleteProduct = (id, callback) => {
//   const query = 'SELECT * FROM products WHERE id = ?';
//   connection.query(query, [id], (err, results) => {
//     if (err) return callback(err);
//     if (results.length === 0) return callback(new Error('Product not found'));

//     const deleteQuery = 'DELETE FROM products WHERE id = ?';
//     connection.query(deleteQuery, [id], (err) => {
//       if (err) return callback(err);
//       callback(null, {
//         message: 'Product deleted successfully',
//         data: results[0]
//       });
//     });
//   });
// };

// module.exports = {
//   listProducts,
//   createProduct,
//   detailProduct,
//   updateProduct,
//   deleteProduct
// };


const express = require('express');
const connection = require('../config/db'); 
const router = express.Router();

// 1. List Products
router.get('/', (req, res) => {
  const query = 'SELECT * FROM products';
  connection.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({
      message: 'Product List',
      data: results
    });
  });
});

// 2. Create Product
router.post('/', (req, res) => {
  const { name, price, stock } = req.body;
  const query = 'INSERT INTO products (name, price, stock, created_at, updated_at) VALUES (?, ?, ?, ?, ?)';
  const currentDate = new Date().toISOString();
  connection.query(query, [name, price, stock, currentDate, currentDate], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({
      id: results.insertId,
      name,
      price,
      stock,
      created_at: currentDate,
      updated_at: currentDate
    });
  });
});

// 3. Detail Product
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM products WHERE id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'Product not found' });
    res.json({
      message: 'Product Detail',
      data: results[0]
    });
  });
});

// 4. Update Product
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, price, stock } = req.body;
  let query = 'UPDATE products SET updated_at = CURRENT_TIMESTAMP';
  const updates = [];
  
  if (name) {
    query += ', name = ?';
    updates.push(name);
  }
  if (price) {
    query += ', price = ?';
    updates.push(price);
  }
  if (stock) {
    query += ', stock = ?';
    updates.push(stock);
  }
  
  query += ' WHERE id = ?';
  updates.push(id);
  
  connection.query(query, updates, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({
      message: 'Product updated successfully',
      data: {
        id,
        name: name || null,
        price: price || null,
        stock: stock || null,
        updated_at: new Date().toISOString()
      }
    });
  });
});

// 5. Delete Product
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM products WHERE id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'Product not found' });

    const deleteQuery = 'DELETE FROM products WHERE id = ?';
    connection.query(deleteQuery, [id], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({
        message: 'Product deleted successfully',
        data: results[0]
      });
    });
  });
});

module.exports = router; // Ekspor router
