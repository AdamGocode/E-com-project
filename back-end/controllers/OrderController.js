const mongoose = require('mongoose');

const Order = require('../models/Order')




module.exports.get_orders =  async (req, res) =>{
    const orderList = await Order.find().populate('user', 'name');

    if(!orderList) {
        res.status(500).json({success: false})
    } 
    res.status(200).json(orderList);
}

module.exports.get_order = async (req, res) =>{
    const order = await Order.findById(req.params.id)
    .populate('user', 'name')
    .populate({ 
        path: 'orderItems', populate: {
            path : 'product', populate: 'category'} 
        });

    if(!order) {
        res.status(500).json({success: false})
    } 
    res.status(200).json(order);
}

module.exports.post_order = async (req,res)=>{
    const orderItemsIds = Promise.all(req.body.orderItems.map(async (orderItem) =>{
        let newOrderItem = new orderItem({
            quantity: orderItem.quantity,
            product: orderItem.product
        })

        newOrderItem = await newOrderItem.save();

        return newOrderItem._id;
    }))
    const orderItemsIdsResolved =  await orderItemsIds;

    const totalPrices = await Promise.all(orderItemsIdsResolved.map(async (orderItemId)=>{
        const orderItem = await Order.findById(orderItemId).populate('product', 'price');
        const totalPrice = orderItem.product.price * orderItem.quantity;
        return totalPrice
    }))

    const totalPrice = totalPrices.reduce((a,b) => a +b , 0);

    let order = new Order({
        // orderItems: orderItemsIdsResolved,
        // shippingAddress1: req.body.shippingAddress1,
        // shippingAddress2: req.body.shippingAddress2,
        // city: req.body.city,
        // zip: req.body.zip,
        // country: req.body.country,
        // phone: req.body.phone,
        // status: req.body.status,
        // totalPrice: totalPrice,
        // user: req.body.user,
    })
    order = await order.save();

    if(!order){ 
        return res.status(400).json({error: 'the order cannot be created!'})
}

    res.status(200).json(order);
}


module.exports.order_put = async (req, res)=> {
    const order = await order.findByIdAndUpdate(
        req.params.id,
        {
            status: req.body.status
        },
        { new: true}
    )

    if(!order) {
        return res.status(400).json({error: 'the order cannot be update!'})
}

    res.status(200).json(order);
}
