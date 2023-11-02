require('dotenv').config();

const express = require('express');
const authRoutes = require('./routes/userRoutes');
const CategoryRoutes = require('./routes/CategoryRoutes');
const SubcategoriesRoutes = require('./routes/SubcategoryRoutes');
const productsRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/OrderRoutes');
const customerRoutes = require('./routes/CustomerRoutes'); 

const app = express();

app.use(express.json());

const connectDB = require('./config/database');

connectDB();




// routes
app.use('/api/auth', authRoutes);
app.use('/api/category', CategoryRoutes)
app.use('/api/subcat', SubcategoriesRoutes);
app.use('/api/product', productsRoutes);
app.use('/api/order', orderRoutes);
app.use('/customer', customerRoutes);





app.listen(process.env.PORT, () => {
    console.log('Server runing on port', process.env.PORT);
})
 
