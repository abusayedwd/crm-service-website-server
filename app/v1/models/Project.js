
const mongoose = require('mongoose');

// Terms schema
const projectSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Fixing the field name to "termsText"
    subTitle: { type: String, required: true }, // Fixing the field name to "termsText"
    content: { type: String, required: true }, // Fixing the field name to "termsText"
    projectImage: { type: Object, required: true }, // Fixing the field name to "termsText"
  }, { timestamps: true });
  
  const Project = mongoose.model('Project', projectSchema);
  module.exports = Project;