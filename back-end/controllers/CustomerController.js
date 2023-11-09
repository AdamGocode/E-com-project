const Customer = require("../models/Customer");
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")
require('dotenv').config;


/// sign up method
const signup_Post =  async (req, res) => {
    const { first_name, last_name, password, email, user_name } = req.body;
    try {
      // Use bcrypt to hash the password before storing it
      const customer = new Customer({ first_name, last_name, password, email, user_name });
      await customer.save();
      
      res.status(201).json({ message: 'Account created successfully' });
    } catch (error) {
      console.error('Error creating customer:', error);
      res.status(500).json({ message: error.message });
    }
}


//login     method
const login_Post = async (req, res) => {
    try {
        const { email, password } = req.body;
        const customer = await Customer.findOne({ email }); // Using email to find customer during login
        if (bcrypt.compareSync(password, customer.password)) {
            // User authenticated, generate a JWT token
            const tokenPayload = { customerId: customer._id }; 
            const token = jwt.sign(tokenPayload, '123', { expiresIn: '10h' });  // 10h means the token expires in 10 hours
            res.status(200).json({ message: "Logged in successfully", token: token });
        } else {
            res.status(401).json({ message: "email or password is incorrect" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// get all the customers list
const getCustomers = async (req, res) => {
    try {
        const customer = await Customer.find();
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//get 10 customers per page 
// const getCustomer = async (req, res) => {
//     const page = parseInt(req.query.page) || 1; 
//     const perPage = 10; 
//     try {
//       // Calculate the skip value to paginate the results
//       const skip = (page - 1) * perPage;
  
//       // Query the database to retrieve customer data with pagination
//       const customers = await Customer.find()
//         .skip(skip)
//         .limit(perPage);
//         if(customers)
//       return res.json(customers);
//     else {
//       return res.json({message:'wa l'})
//     }
//     } catch (error) {
//       console.error('Error fetching customer data:', error);
//       res.status(500).json({ message: error.message });
//     }
//   };

const getCustomerById = async (req, res) => {
  const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'customer not found'})
    }
    const customer = await Customer.findById(id);
    if (!customer) {
      return res.status(404).json({error: 'customer not found'})
    }
    res.status(200).json(customer)
  };

  const updateCustomer = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'invalid customer id'})
    }
    const customer = await Customer.findByIdAndUpdate({_id: id}, {
      ...req.body
    }, { new: true })
    if (!customer) {
      return res.status(404).json({error: 'invalid customer id'})
    }
    res.status(200).json({message: 'customer updated successfully'})
  }
  
  const deleteCustomer = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'customer not found'})
    }
    const customer = await Customer.findOneAndDelete({_id: id})
    if (!customer) {
      return res.status(404).json({error: 'customer not found'})
    }
    res.status(200).json({message: 'customer deleted successfully'})
  }


module.exports = {
    getCustomers,
    signup_Post,
    login_Post,
    getCustomerById,
    updateCustomer,
    deleteCustomer
}