const mongoose = require('mongoose');

const Product = require('../models/Product');


module.exports.getProduct =  async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:'Product Not Found'})
    }
    const product = await Product.findById(id);
    if (!product) {
        res.status(404).json({ error:'product not found' });
    }
    res.status(200).json(product);
};

module.exports.getProducts =  async (req, res) =>{
    const products = await Product.find();
    res.status(200).json(products)
}

module.exports.product_post = async (req, res) => {
    
    let product = new Product({
        product_name: req.body.product_name,
        sku: req.body.sku,
        price: req.body.price,
        
    });

    product = await product.save();

    if (!product){
        return res.status(500).send({error:'The product cannot be created'});
    }
    res.status(201).send(product);
};





module.exports.product_put = async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({ message: 'Invalid Product Id' });
        }
    
        try {
            const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    
            if (!product) {
                return res.status(404).json({ message: 'The product cannot be found' });
            }
    
            res.status(200).json(product);
        } catch (error) {
            return res.status(500).json({ message: 'Error updating the product' });
        }
    };
   
    
module.exports.product_delete = (req, res) => {
    Product.findByIdAndRemove(req.params.id).then(product => {
        if (product) {
            return res.status(200).json({ success: true, message: 'The product is deleted!' });
        } else {
            return res.status(404).json({ success: false, message: 'Product not found!' });
        }
    }).catch(err => {
        return res.status(500).json({ success: false, error: err });
    });
};
