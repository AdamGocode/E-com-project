const mongoose = require('mongoose');


const orderSchema = mongoose.Schema({
    id :{
        type:String
    },
    customer_id:{
        type:String,
        required:true
    },
    order_items :{
        type:Array,
        required: true
    },
    order_date:{
        type:Date
    },
    cart_total_price:{
        type:Number,
        required: true
    },
    status:{
        type:String
    },
},{ timestamps:true});


const order = mongoose.model('order',orderSchema);
module.exports = order;
