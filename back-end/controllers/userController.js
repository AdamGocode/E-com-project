const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const maxAge = 4 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: maxAge });
}


module.exports.signup_post = async (req, res) =>  { 
  const { first_name, last_name, email, user_name, role, password } = req.body;
  try  {
     const user = await User.create({ first_name, last_name, email, role, user_name, password });
        res.status(201).json({message: 'user created successfully'});
    } catch (err) {
         console.log(err);
         res.status(400).send('error, user not created');
     }
}

module.exports.login_post = async  (req, res) => {
    const { user_name, password } = req.body;
    try {
      const user = await User.findOne({ user_name: user_name });
      if (user) {
        const auth = bcrypt.compareSync(password, user.password);
        if (auth) {
          const token = jwt.sign({user}, process.env.JWT_SECRET)
          res.status(200).json({
            token:token
          })
        }
      }
  } 
catch (err) {
  res.status(401).json({message: 'invalid credentials'})
 } 
}

module.exports.getUsers = async (req, res) => {
    const Users = await User.find();
    res.status(200).json(Users)
  }

module.exports.getUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'user not found'})
  }
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({error: 'user not found'})
  }
  res.status(200).json(user)
}

module.exports.updateUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'invalid user id'})
  }
  const user = await User.findByIdAndUpdate({_id: id}, {
    ...req.body
  })
  if (!user) {
    return res.status(404).json({error: 'invalid user id'})
  }
  res.status(200).json({message: 'user updated successfully'})
}

module.exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'user not found'})
  }
  const user = await User.findOneAndDelete({_id: id})
  if (!user) {
    return res.status(404).json({error: 'user not found'})
  }
  res.status(200).json({message: 'user deleted successfully'})
}