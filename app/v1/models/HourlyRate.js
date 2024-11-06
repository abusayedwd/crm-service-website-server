
const mongoose = require('mongoose');

// Terms schema
const hourlyRateSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Fixing the field name to "termsText"
    eighHours: { type: String, required: true }, // Fixing the field name to "termsText"
    tenHours: { type: String, required: true }, // Fixing the field name to "termsText"
    function: { type: String, required: true }, // Fixing the field name to "termsText"
   
        
}, { timestamps: true });
  
  const HourlyRate = mongoose.model('HourlyRate', hourlyRateSchema);
  module.exports = HourlyRate;