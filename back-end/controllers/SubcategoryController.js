const mongoose = require('mongoose');
const Subcategories = require('../models/Subcategory');


module.exports.Subcategory_post = async (req, res) => {
    const { subcategory_name } = req.body;
    try {
        const subcategory = await Subcategories.create({ subcategory_name : subcategory_name });
        res.status(201).json(subcategory)
    }
    catch (err) {
        res.status(400).json(Error);
    }
}

module.exports.getSubcategories = async (req, res) => {
    try {
    const subcategories = await Subcategories.find()
    // .populate(path = 'category_id' , select = 'category_name')
    // .exec();
    res.status(200).json(subcategories)
} catch (error) {
        res.status(500).json(error.message);
}
}

module.exports.getSubcategory = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'subcategory not found'})
      }
      const subcategory = await Subcategories.findById(id);
      if (!subcategory) {
        return res.status(404).json({error: 'subcategory not found'})
      }
      res.status(200).json(subcategory)
}

module.exports.updateSubcategory = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'subcategory not found'})
      }
      const subcategory = await Subcategories.findByIdAndUpdate(id);
      if (!subcategory) {
        return res.status(404).json({error: 'subcategory not found'})
      }
      res.status(200).json({message: "subcategory updated successfully"})
}

module.exports.deleteSubcategory = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'subcategory not found'})
    }
    const subcategory = await Subcategories.findByIdAndDelete(id);
    if (!category) {
        return res.status(404).json({error: 'subcategory not found'})
    }
    res.status(200).json({message: 'subcategory deleted successfully'})
}