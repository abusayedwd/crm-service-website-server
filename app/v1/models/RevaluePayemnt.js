
const mongoose = require('mongoose');

// Terms schema
const paymentRevalueSchema = new mongoose.Schema({
    startDate: { type: String, required: true }, // Fixing the field name to "termsText"
    completedData: { type: String, required: true }, // Fixing the field name to "termsText"
    type: { type: String, required: true }, // Fixing the field name to "termsText"
    referance: { type: String, required: true }, // Fixing the field name to "termsText"
    orignalAmount: { type: String, required: true }, // Fixing the field name to "termsText"
  }, { timestamps: true });
  
  const RevaluePayment = mongoose.model('RevaluePayment', paymentRevalueSchema);
  module.exports = RevaluePayment;