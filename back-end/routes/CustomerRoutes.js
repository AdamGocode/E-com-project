// authRoutes.js
const { Router } = require('express');
const { getCustomer, signup_Post, login_Post, getCustomerById } = require('../controllers/CustomerController');
const router = Router();
// const getCustomerById = require('../Controllers/customerController')

router.post('/signup', signup_Post);
router.post('/login', login_Post);
router.get('/', getCustomer);
router.get('/:id', getCustomerById);
// const checkRole = require('../utils/customerMiddle')

// Use the custom middleware for the /api/customer-data route






module.exports = router;

