const { Router } = require('express');
const product = require('../controllers/productController');
const express = require('express');
const router = express.Router();



router.post('/', product.product_post);
router.get('/', product.getProducts);
router.get('/:id', product.getProduct);
router.put('/:id', product.product_put);
router.delete('/:id', product.product_delete);



module.exports = router;