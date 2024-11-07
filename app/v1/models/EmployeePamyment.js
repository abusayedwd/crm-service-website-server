
const mongoose = require('mongoose');

// Terms schema
const paymentSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Fixing the field name to "termsText"
    amount: { type: String, required: true }, // Fixing the field name to "termsText"
    date: { type: String, required: true }, // Fixing the field name to "termsText"
    function: { type: String, required: true }, // Fixing the field name to "termsText"
    forWhat: { type: String, required: true }, // Fixing the field name to "termsText"
   
        
}, { timestamps: true });
  
  const EmployeePayment = mongoose.model('EmployeePayment', paymentSchema);
  module.exports = EmployeePayment;