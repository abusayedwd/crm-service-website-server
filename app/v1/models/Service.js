
const mongoose = require('mongoose');

// Terms schema
const serviceSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Fixing the field name to "termsText"
    link: { type: String, required: true }, // Fixing the field name to "termsText"
    serviceImage: { type: Object, required: true }, // Fixing the field name to "termsText"
  }, { timestamps: true });
  
  const Service = mongoose.model('Service', serviceSchema);
  module.exports = Service