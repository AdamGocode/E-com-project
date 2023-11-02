const express = require('express');
const { Router } = require('express');
const Subcategories = require('../controllers/SubcategoryController');


const router = Router();

router.post('/', Subcategories.Subcategory_post);

router.get('/', Subcategories.getSubcategories);

router.get('/:id', Subcategories.getSubcategory);

router.put('/:id', Subcategories.updateSubcategory);

router.delete('/:id', Subcategories.deleteSubcategory);


module.exports = router;