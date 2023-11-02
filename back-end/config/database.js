const mongoose = require('mongoose');

const connectDB = () => {
   mongoose.connect(process.env.MONGO_URL)
   .then(() => {
      console.log("mongo connected")
   })
   .catch((error) => {
      console.log(error);
   })
} 

 module.exports = connectDB