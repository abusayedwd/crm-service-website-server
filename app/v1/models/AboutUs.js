
const mongoose = require('mongoose');

// Terms schema
const aboutSchema = new mongoose.Schema({
    aboutUsText: { type: String, required: true }, // Fixing the field name to "termsText"
  }, { timestamps: true });
  
  const AboutUs = mongoose.model('AboutUs', aboutSchema);
  module.exports = { AboutUs};