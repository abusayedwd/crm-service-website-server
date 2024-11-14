
const mongoose = require('mongoose');

// Terms schema
const costSchema = new mongoose.Schema({
    projectId: { type: mongoose.Schema.Types.ObjectId,ref:"ProjectList",required:true}, 
    costType: { type: String, required: true }, 
    // year:{type:String,required:true},
    month:{type:String,required:true},
    week:[
        {
          weekName: { type: String, required: true }, 
          amount:{type:String,required:true}

          
        }
      ],
   
  }, { timestamps: true });
  
  const Cost = mongoose.model('Cost', costSchema);
  module.exports = Cost