
const mongoose = require('mongoose');
const daySchema = new mongoose.Schema({
  dayName: { type: String, required: true }, // Example: "Monday"
  hours: { type: String, required: true }    // Number of hours worked
});
// Terms schema
const workHourSchema = new mongoose.Schema({
    employeId: { type: mongoose.Schema.Types.ObjectId,ref:"Employee",required:true}, 
    projectId: { type: mongoose.Schema.Types.ObjectId,ref:"ProjectList",required:true}, 
   

    week:[
      {
        weekName: { type: String, required: true }, 
        dayName: [daySchema]
      }
    ]

  }, { timestamps: true });
  
  const WorkHour = mongoose.model('WorkHour', workHourSchema);
  module.exports = WorkHour