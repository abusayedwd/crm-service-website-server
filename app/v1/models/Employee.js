
const mongoose = require('mongoose');

// Terms schema
const empolyeeschema = new mongoose.Schema({
    name: { type: String, required: true }, // Fixing the field name to "termsText"
    dateOfBirth: { type: String, required: true }, // Fixing the field name to "termsText"
    inServiceForm: { type: String, required: true }, // Fixing the field name to "termsText"
    address: { type: String, required: true }, // Fixing the field name to "termsText"
    city: { type: String, required: true }, // Fixing the field name to "termsText"
     email:{type:String,required:true},
     vcaNr:{type:String,required:true},
     bic:{type:String,required:true},
     bnsNr:{type:String,required:true},
     hrId:{type:String,required:true},
     outOfService:{type:String,required:true},
     postalCode:{type:String,required:true},
     country:{type:String,required:true},
     mobile:{type:String,required:true},
     
     ibn:{type:String,required:true},
        
}, { timestamps: true });
  
  const Employee = mongoose.model('Employee', empolyeeschema);
  module.exports = Employee;