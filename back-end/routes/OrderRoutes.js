const express = require('express');
const { Router }= require('express');
const {get_orders, get_order, post_order, order_put} = require('../controllers/OrderController');


const router = Router();


router.get('/:id',get_order );
router.get('/',get_orders);
router.post('/',post_order);
router.put('/:id',order_put);
// router.delete('/:id', delete)

module.exports = router;
