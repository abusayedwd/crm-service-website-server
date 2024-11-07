const pagination = require('../../../helpers/pagination');
const Response = require('../../../helpers/respones');
const Project  = require('../models/Project'); // Import the Project model

// Create Project Controller
const createProject = async (req, res, next) => {
    try {
        const { title, subTitle, content } = req.body;
        const { project } = req.files || {};
        const files = [];

        // Check if there are uploaded files
        if (project && Array.isArray(project)) {
            project.forEach((img) => {
                const publicFileUrl = `/images/users/${img.filename}`;
                files.push({
                    publicFileUrl,
                    path: img.filename,
                });
            });
        }

        if (!title || !subTitle || !content) {
            return res.status(400).json({
                status: "error",
                statusCode: 400,
                message: "All fields (title, subTitle, content) are required."
            });
        }

        const newProject = new Project({
            title,
            subTitle,
            content,
            projectImage: files[0]
        });

        await newProject.save();

        res.status(201).json({
            status: "success",
            statusCode: 201,
            message: "Project created successfully.",
            data: newProject
        });
    } catch (error) {
        next(error);
    }
};

// Update Project Controller
const updateProject = async (req, res, next) => {
    try {
        const { id } = req.body; // Get project ID from request parameters
        const { title, subTitle, content } = req.body;
        const { project } = req.files || {};
        const files = [];

        if (project && Array.isArray(project)) {
            project.forEach((img) => {
                const publicFileUrl = `/images/users/${img.filename}`;
                files.push({
                    publicFileUrl,
                    path: img.filename,
                });
            });
        }

        const updatedData = {
            ...(title && { title }),
            ...(subTitle && { subTitle }),
            ...(content && { content }),
            ...(files[0] && { projectImage: files[0] }),
        };

        const updatedProject = await Project.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedProject) {
            return res.status(404).json({
                status: "error",
                statusCode: 404,
                message: "Project not found."
            });
        }

        res.status(200).json({
            status: "success",
            statusCode: 200,
            message: "Project updated successfully.",
            data: updatedProject
        });
    } catch (error) {
        next(error);
    }
};

// Show All Projects Controller
const showAllProjects = async (req, res, next) => {
    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const projectsLength = await Project.find().countDocuments()
        const projects = await Project.find()

         // for the pagination 

   const paginationOfPost= pagination(projectsLength,limit,page)
        res.status(200).json(Response({
            status: "success",
            statusCode: 200,
            message: "Projects retrieved successfully.",
            data: projects,
            pagination:paginationOfPost
        }));
    } catch (error) {
        next(error);
    }
};

// Show Project By ID Controller
const showProjectById = async (req, res, next) => {
    try {
        const { id } = req.query; // Get project ID from request parameters
        const project = await Project.findById(id);

        if (!project) {
            return res.status(404).json({
                status: "error",
                statusCode: 404,
                message: "Project not found."
            });
        }

        res.status(200).json({
            status: "success",
            statusCode: 200,
            message: "Project retrieved successfully.",
            data: project
        });
    } catch (error) {
        next(error);
    }
};



module.exports = {
    createProject,
    updateProject,
    showAllProjects,
    showProjectById
};
