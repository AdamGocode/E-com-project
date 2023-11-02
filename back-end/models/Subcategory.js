const mongoose = require('mongoose');

const subcategoriesSchema = new mongoose.Schema({
    subcategory_name: {
        type: String,
        required: true, 
        unique: true
    },
    category_id: {
        type: String,
        required: true,
        ref:'CategoryModel'
    },
    active: {
        type: Boolean,
        default: false
    }
})

const Subcategories = mongoose.model('Subcategories', subcategoriesSchema);
module.exports = Subcategories;