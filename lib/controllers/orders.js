const { Router } = require('express');
const Order = require('../models/Order');
const pool = require('../utils/pool');

module.exports = Router()
  .post('/', async (req, res) => {
    const order = await Order.insert(req.body);
    console.log('req.body', req.body);
    res.json(order);
  })

  .get('/:id', async (req, res) => {
    const order = await Order.getById(req.params.id);
    res.json(order);
  })

  .get('/', async (req, res) => {
    const order = await Order.getAll(req.body);
    res.json(order);
  })
  
  .patch('/:id', async (req, res) => {
    const order = await Order.updateById(req.params.id, req.body);
    res.send(order);
  })

  .delete('/:id', async (req, res) => {
    const { rows } = await pool.query(
      'DELETE FROM orders WHERE id=$1 RETURNING *;',
      [req.params.id]
    );

    if (!rows[0]) return null;
    const order = new Order(rows[0]);

    res.json(order);
  });
