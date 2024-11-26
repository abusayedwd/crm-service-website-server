
const mongoose = require('mongoose');
const dayRateSchema = new mongoose.Schema({
  dayName: { type: String, required: true }, // Example: "Monday"
  eighthours: { type: String, required: true },    // Number of hours worked
  tenhours: { type: String, required: true },    // Number of hours worked


});
// Terms schema
const workHourRateSchema = new mongoose.Schema({
    employeId: { type: mongoose.Schema.Types.ObjectId,ref:"Employee",required:true}, 
    projectId: { type: mongoose.Schema.Types.ObjectId,ref:"ProjectList",required:false}, 
   

    week:[
      {
        weekName: { type: String, required: true }, 
        dayName: [dayRateSchema]
      }
    ]

  }, { timestamps: true });
  
  const EmployeeHoureRate = mongoose.model('EmployeeHoureRate', workHourRateSchema);
  module.exports = EmployeeHoureRate