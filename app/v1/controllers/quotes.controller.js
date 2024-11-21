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
            message: "Project list item created successfully",
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
            message: "Project lists retrieved successfully",
            data: projectLists,
        });
    } catch (error) {
        next(error); // Pass the error to the global error handler
    }
};

module.exports={
    createProjectList,
    showAllProjectLists
}