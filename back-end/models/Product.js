const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    
    product_name: {
        type:String,
        required: true
    },
    product_image:{
        type:String 
    },
     
    short_description:{
        type:String
    },
    long_description:{
        type:String
    },
    price:{
        type:Number,
        required: true
    },
    discount_price:{
        type:Number
    },
    options:{
        type: []
    },
    active:{
        type:Boolean
    },
    sku:{
        type:String,
        required: true
    },
    id:{
        type:String
    },
    subcategory_id:{
        type:String,
        // required: true
    },
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;