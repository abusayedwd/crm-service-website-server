
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

     // hourly rate portion
     eightHourRate:{type:String,required:false,default:"20"},
     tenHourRate:{type:String,required:false,default:"30"},
     function:{type:String,required:false,default:"employee"},

     // employee payment
     paymentAmount:{type:String,require:false,default:"0"},
     paymentDate:{type:String,require:false},
     forWhatPayment:{type:String,require:false},
     paymentAction:{type:String,require:false,enum:["paid","unpaid"],default:"unpaid"},

    //  // employe hours per week
    //  projectName:{type:String,required:false},
    //  workForWeekName:{type:String,required:false},
    //  workForDayName:{type:String,required:false},
    //  workForHours:{type:String,required:false},
     


        
}, { timestamps: true });
  
  const Employee = mongoose.model('Employee', empolyeeschema);
  module.exports = Employee;