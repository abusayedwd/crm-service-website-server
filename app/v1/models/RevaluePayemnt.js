
const mongoose = require('mongoose');

// Terms schema
const paymentRevalueSchema = new mongoose.Schema({
    startDate: { type: String, required: true }, // Fixing the field name to "termsText"
    completedData: { type: String, required: true }, // Fixing the field name to "termsText"
    type: { type: String, required: true }, // Fixing the field name to "termsText"
    bankrefPicture:{type:Object,required:true},
    referance: { type: String, required: true }, // Fixing the field name to "termsText"
    orignalAmount: { type: String, required: true }, // Fixing the field name to "termsText"
  }, { timestamps: true });
  
  const RevaluePayment = mongoose.model('RevaluePayment', paymentRevalueSchema);
  module.exports = RevaluePayment;


// Model >>>>>>>>>>>>>>>>>
// const mongoose = require('mongoose');
// const csvfileSchema = new mongoose.Schema({
// origAmount: {
// type: Number,
// required: true
// },
// reference: {
// type: String,
// required: true
// },
// type: {
// type: String,
// required: true
// },
// dateCompleted: {
// type: String,
// required: true
// },
// dateStarted: {
// type: String,
// required: true
// },
// description: {
// type: String,
// required: true
// },
// fileName: {
// type: String,
// required: true
// },
// fileSize: {
// type: Number,
// required: true
// },
// uploadDate: {
// type: Date,
// default: Date.now
// }
// }, { timestamps: true });
// // Use mongoose.models to check if the model already exists
// const Csvfile = mongoose.models.Csvfile || mongoose.model('Csvfile', csvfileSchema);
// module.exports = Csvfile;