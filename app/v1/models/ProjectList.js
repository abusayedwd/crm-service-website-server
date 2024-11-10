
const mongoose = require('mongoose');

// Terms schema
const projectListSchema = new mongoose.Schema({
    project: { type: String, required: true }, // Fixing the field name to "termsText"
    projectName:{type:String,require:true},
    address:{type:String,require:true},
    postCode:{type:String,require:true},
    city:{type:String,require:true},
    description:{type:String,require:true},
    startDate:{type:String,require:true},
    endDate:{type:String,require:true},
    action:{type:String,require:true,enum:["yes","no"],default:"no"},
  }, { timestamps: true });
  
  const ProjectList = mongoose.model('ProjectList', projectListSchema);
  module.exports = ProjectList;