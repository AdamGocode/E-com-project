const mongoose = require('mongoose');
const { isEmail} = require('validator');
const bcrypt = require('bcrypt');

const customerSchema = new mongoose.Schema ({
    first_name: {
        type:String,
        trim: true,
        required:[true, 'Please enter your first name']
        },
    last_name: {
        type:String,
        trim:true,
        required:[true, 'Please enter your last  name']
    },
    email: {
        type:String,
        trim:true,
        unique: true,
        required:[true, 'Please enter your password'],
        validate:[isEmail, 'Please enter a valid email']
    },
    password: {
        type:String,
        trim:true,
        required:[true, 'Please enter your password'],
        },
    user_name: {
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    role: {
        type: String,
        enum: ['customer', 'admin', 'manager'], // Define allowed roles
        default: 'customer' // Set a default role
      },
    creation_date: {
        type:Date,
        default:Date.now,
    },
    active: {
        type: Boolean,
        default: false
    }
},
    {
    timestamps: true
    }
);

/// hash password
customerSchema.pre('save', async function (next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next()
});


// static login user 
customerSchema.statics.login = async function(email, password) {
    const user = await this.findOne({email});
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      }
      throw Error('Incorrect Password');
    }
    throw Error('Incorrect Email');
}

const Customer = mongoose.model('customer', customerSchema);

module.exports = Customer;

