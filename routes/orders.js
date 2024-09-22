const express = require('express');
const connection = require('../config/db');
const router = express.Router();

// 1. List Orders
router.get('/', (req, res) => {
    const query = `
        SELECT o.id, o.quantity, o.created_at, o.updated_at, 
               o.product_id, o.product_name, o.price, o.stock, o.sold 
        FROM orders o
    `;

    connection.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        const data = results.map(row => ({
            id: row.id,
            product: {
                id: row.product_id,
                name: row.product_name,
                price: row.price,
                quantity: row.quantity,
                stock: row.stock,
                sold: row.sold,
            },
            created_at: row.created_at,
            updated_at: row.updated_at,
        }));
        res.json({ message: 'Order List', data });
    });
});

// 2. Create Order
router.post('/', (req, res) => {
    const { product_id, product_name, price, quantity, stock, sold } = req.body;

    if (!product_id || !quantity || quantity < 1) {
        return res.status(400).json({ error: 'Product ID and quantity are required' });
    }

    const query = 'INSERT INTO orders (product_id, product_name, price, quantity, stock, sold) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(query, [product_id, product_name, price, quantity, stock, sold], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Order created successfully', data: { id: result.insertId, product_id, product_name, price, quantity, stock, sold } });
    });
});

// 3. Detail Order
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const query = `
        SELECT o.id, o.quantity, o.created_at, o.updated_at, 
               o.product_id, o.product_name, o.price, o.stock, o.sold 
        FROM orders o 
        WHERE o.id = ?
    `;

    connection.query(query, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: 'Order not found' });

        const row = results[0];
        const data = {
            id: row.id,
            product: {
                id: row.product_id,
                name: row.product_name,
                price: row.price,
                quantity: row.quantity,
                stock: row.stock,
                sold: row.sold,
            },
            created_at: row.created_at,
            updated_at: row.updated_at,
        };
        res.json({ message: 'Order Detail', data });
    });
});

// 4. Delete Order
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM orders WHERE id = ?';
    connection.query(query, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ error: 'Order not found' });

        res.json({ message: 'Order deleted successfully', data: { id } });
    });
});

module.exports = router;


