const express = require('express');
const { Router } = require('express');
const Category = require('../controllers/CategoryController');

const router = Router();

router.post('/', Category.Category_post);

router.get('/', Category.getCategories);

router.get('/:id', Category.getCategory);

router.put('/:id', Category.updateCategory);

router.delete('/:id', Category.deleteCategory);


module.exports = router;