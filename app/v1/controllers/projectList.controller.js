const Response = require("../../../helpers/respones");
const ProjectList = require("../models/ProjectList");

// Create a new project
const createProject = async (req, res, next) => {
    try {
        const { project, projectName, address, postCode, city, description, startDate, endDate, action } = req.body;

        const newProject = new ProjectList({
            project,
            projectName,
            address,
            postCode,
            city,
            description,
            startDate,
            endDate,
            action
        });

        const savedProject = await newProject.save();
        res.status(201).json(Response({
            status: "success",
            statusCode: 201,
            message: "Project created successfully",
            data: savedProject
        }));
    } catch (error) {
        next(error);
    }
};

// Update an existing project by ID
const updateProject = async (req, res, next) => {
    try {
        const { id } = req.query;
        const { project, projectName, address, postCode, city, description, startDate, endDate, action } = req.body;

        const updatedProject = await ProjectList.findByIdAndUpdate(
            id,
            {
                project,
                projectName,
                address,
                postCode,
                city,
                description,
                startDate,
                endDate,
                action
            },
            { new: true }
        );

        if (!updatedProject) {
            return res.status(404).json(Response({
                status: "error",
                statusCode: 404,
                message: "Project not found"
            }));
        }

        res.status(200).json(Response({
            status: "success",
            statusCode: 200,
            message: "Project updated successfully",
            data: updatedProject
        }));
    } catch (error) {
        next(error);
    }
};

// Delete a project by ID
const deleteProject = async (req, res, next) => {
    try {
        const { id } = req.query;

        const deletedProject = await ProjectList.findByIdAndDelete(id);

        if (!deletedProject) {
            return res.status(404).json(Response({
                status: "error",
                statusCode: 404,
                message: "Project not found"
            }));
        }

        res.status(200).json(Response({
            status: "success",
            statusCode: 200,
            message: "Project deleted successfully"
        }));
    } catch (error) {
        next(error);
    }
};

// Get all projects
const getAllProjects = async (req, res, next) => {
    try {
        const projects = await ProjectList.find();

        res.status(200).json(Response({
            status: "success",
            statusCode: 200,
            message:"show all project list",
            data: projects
        }));
    } catch (error) {
        next(error);
    }
};

// Get a project by ID
const getProjectById = async (req, res, next) => {
    try {
        const { id } = req.query;

        const project = await ProjectList.findById(id);

        if (!project) {
            return res.status(404).json(Response({
                status: "error",
                statusCode: 404,
                message: "Project not found"
            }));
        }

        res.status(200).json(Response({
            status: "success",
            statusCode: 200,
            data: project
        }));
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createProject,
    updateProject,
    deleteProject,
    getAllProjects,
    getProjectById
};
