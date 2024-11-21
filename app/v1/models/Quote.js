
const mongoose = require('mongoose');

// Terms schema
const queteSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Fixing the field name to "termsText"
    email:{type:String,require:true},
    phone:{type:String,require:true},
   
    serviceName:{type:String,require:true},
    description:{type:String,require:true},
   
  }, { timestamps: true });
  
  const Quote = mongoose.model('Quote', queteSchema);
  module.exports = Quote;