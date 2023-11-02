const express = require('express');
const { Router } = require('express');
const authUserController = require('../controllers/userController');
const { checkAdmin } = require("../middleware/authMiddleware");

const router = Router();

router.post('/signup', authUserController.signup_post);

router.post('/login', authUserController.login_post);

router.get('/', authUserController.getUsers);

router.get('/:id', authUserController.getUser);

router.put('/:id', authUserController.updateUser);

router.delete('/:id', authUserController.deleteUser);

module.exports = router;

