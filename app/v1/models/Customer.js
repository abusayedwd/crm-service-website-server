
const mongoose = require('mongoose');

// Terms schema
const customerchema = new mongoose.Schema({
    name: { type: String, required: true }, // Fixing the field name to "termsText"
    address: { type: String, required: true }, // Fixing the field name to "termsText"
    city: { type: String, required: true }, // Fixing the field name to "termsText"
    customerImage: { type: Object, required: true }, // Fixing the field name to "termsText"
     contactPerson:{type:String,required:true},
     email:{type:String,required:true},
     gender:{type:String,required:true},
     postalCode:{type:String,required:true},
     mobile:{type:String,required:true},
     state:{type:String,required:true},
     billingEmail:{type:String,required:true},
        
}, { timestamps: true });
  
  const Customer = mongoose.model('Customer', customerchema);
  module.exports = Customer;