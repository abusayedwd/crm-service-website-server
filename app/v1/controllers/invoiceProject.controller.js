const InvoiceProject = require('../models/InvoiceProject'); // Adjust the path based on your project structure

// Create Invoice Project
const createInvoiceProject = async (req, res, next) => {
    try {
        const { projectList, customer, invoiceNo, week, description, amount, dueDate, date, paid } = req.body;
        
        console.log(projectList, customer, invoiceNo, week, description, amount, dueDate, date, paid );

        // Create a new invoice project
        const newInvoice = new InvoiceProject({
            projectList,
            customer,
            invoiceNo,
            week,
            description,
            amount,
            dueDate,
            date,
            paid
        });

        // Save the invoice project to the database
        const savedInvoice = await newInvoice.save();
        console.log(savedInvoice,"___________________");

        res.status(201).json({
            status: "success",
            statusCode: 201,
            message: "Invoice project created successfully",
            data: savedInvoice
        });
    } catch (error) {
        next(error);
    }
};

// Update Invoice Project
const updateInvoiceProject = async (req, res, next) => {
    try {
        const { id } = req.params; // Get the invoice project ID from the request parameters
        const updates = req.body; // Fields to update

        // Update the invoice project by ID
        const updatedInvoice = await InvoiceProject.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedInvoice) {
            return res.status(404).json({
                status: "error",
                statusCode: 404,
                message: "Invoice project not found"
            });
        }

        res.status(200).json({
            status: "success",
            statusCode: 200,
            message: "Invoice project updated successfully",
            data: updatedInvoice
        });
    } catch (error) {
        next(error);
    }
};

const showAllInvoiceProjects = async (req, res, next) => {
    try {
        // Fetch all invoice projects and populate references
        const invoiceProjects = await InvoiceProject.find()
            .populate('customer', 'name') // Populate customer field with only the "name" field
            .populate('projectList', 'projectName'); // Populate project field with only the "name" field

        res.status(200).json({
            status: "success",
            statusCode: 200,
            message: "Invoice projects retrieved successfully",
            data: invoiceProjects
        });
    } catch (error) {
        next(error);
    }
};


// Show Invoice Project By ID
const showInvoiceProjectById = async (req, res, next) => {
    try {
        const { id } = req.query; // Get the invoice project ID from the request parameters

        // Find the invoice project by ID
        const invoiceProject = await InvoiceProject.findById(id)
            .populate('projectList', 'name') // Populate project field with only the "name" field
            .populate('customer', 'name'); // Populate customer field with only the "name" field

        if (!invoiceProject) {
            return res.status(404).json({
                status: "error",
                statusCode: 404,
                message: "Invoice project not found"
            });
        }

        res.status(200).json({
            status: "success",
            statusCode: 200,
            message: "Invoice project retrieved successfully",
            data: invoiceProject
        });
    } catch (error) {
        next(error);
    }
};

// Export Controllers
module.exports = {
    createInvoiceProject,
    updateInvoiceProject,
    showAllInvoiceProjects,
    showInvoiceProjectById
};
