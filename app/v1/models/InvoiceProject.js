const mongoose = require('mongoose');

// Invoice Project Schema
const invoiceProjectSchema = new mongoose.Schema({
    projectList: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "ProjectList", 
        required: true 
    }, // Reference to the Project model
    customer: { // Fixed typo from "coustomer" to "customer"
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Customer", 
        required: true 
    }, // Reference to the Customer model
    invoiceNo: { 
        type: String, 
        required: true 
    }, // Invoice number
    week: { 
        type: String, 
        required: true 
    }, // Week associated with the invoice
    description: { 
        type: String, 
        required: true 
    }, // Invoice description
    amount: { 
        type: String, 
        required: true 
    }, // Invoice amount
    dueDate: { 
        type: String, 
        required: true 
    }, // Invoice due date
    date: { 
        type: String, 
        required: true 
    }, // Invoice creation date
    paid: { 
        type: String, 
        enum: ["yes", "no"], 
        default: "no", 
        required: true 
    } // Payment status
}, { timestamps: true });

// Export the Invoice Project Model
const InvoiceProject = mongoose.model('InvoiceProject', invoiceProjectSchema);
module.exports = InvoiceProject;
