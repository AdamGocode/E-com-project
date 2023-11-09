// authRoutes.js
const { Router } = require('express');
const { getCustomer, signup_Post, login_Post, getCustomerById, getCustomers } = require('../controllers/CustomerController');
const router = Router();

router.post('/signup', signup_Post);
router.post('/login', login_Post);
router.get('/', getCustomers);
router.get('/:id', getCustomerById);
// const checkRole = require('../utils/customerMiddle')

// Use the custom middleware for the /api/customer-data route






module.exports = router;

