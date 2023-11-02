const mongoose = require('mongoose');
const Category = require('../models/Category');


module.exports.Category_post = async (req, res) => {
    const { category_name } = req.body;
    try {
        const category = await Category.create({ category_name : category_name });
        res.status(201).json(category)
    }
    catch (err) {
        console.log(err);
        res.status(400).json(Error);
    }
}

module.exports.getCategories = async (req, res) => {
    const Categories = await Category.find();
    res.status(200).json(Categories)
}

module.exports.getCategory = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'category not found'})
      }
      const category = await Category.findById(id);
      if (!category) {
        return res.status(404).json({error: 'category not found'})
      }
      res.status(200).json(category)
}

module.exports.updateCategory = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'category not found'})
      }
      const category = await Category.findByIdAndUpdate(id);
      if (!category) {
        return res.status(404).json({error: 'category not found'})
      }
      res.status(200).json({message: 'category updated successfully'})
}

module.exports.deleteCategory = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'category not found'})
    }
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
        return res.status(404).json({error: 'category not found'})
    }
    res.status(200).json({message: 'category deleted successfully'})
}