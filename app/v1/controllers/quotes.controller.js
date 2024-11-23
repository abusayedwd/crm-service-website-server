const Quote = require("../models/Quote");

const createProjectList = async (req, res, next) => {
    try {
        const { name, email, phone, serviceName, description } = req.body;

        // Create a new ProjectList document
        const newProject = new Quote({
            name,
            email,
            phone,
            serviceName,
            description,
        });

        // Save the document to the database
        const savedProject = await newProject.save();

        res.status(201).json({
            status: "success",
            statusCode: 201,
            message: "Quote list item created successfully",
            data: savedProject,
        });
    } catch (error) {
        next(error); // Pass the error to the global error handler
    }
};
const showAllProjectLists = async (req, res, next) => {
    try {
        // Retrieve all ProjectList documents from the database
        const projectLists = await Quote.find();

        res.status(200).json({
            status: "success",
            statusCode: 200,
            message: "Quote- lists retrieved successfully",
            data: projectLists,
        });
    } catch (error) {
        next(error); // Pass the error to the global error handler
    }
};

const deleteProjectList = async (req, res, next) => {
    try {
        const { id } = req.query; // Get the project ID from the request parameters

        // Find and delete the project by ID
        const deletedProject = await Quote.findByIdAndDelete(id);

        // If no project is found, return an error
        if (!deletedProject) {
            return res.status(404).json({
                status: "error",
                statusCode: 404,
                message: "Project not found",
            });
        }

        res.status(200).json({
            status: "success",
            statusCode: 200,
            message: "quote deleted successfully",
       
        });
    } catch (error) {
        next(error); // Pass the error to the global error handler
    }
};



module.exports={
    createProjectList,
    showAllProjectLists,
    deleteProjectList
}