
const express = require('express');





const authenticateUser = require('../../../middlewares/auth');

const { createProject, updateProject, getAllProjects, getProjectById, deleteProject, getAllProjectNames } = require('../controllers/projectList.controller');

const router = express.Router()

router.post('/createProject',authenticateUser,createProject)
router.patch('/updateProject',authenticateUser,updateProject)
router.get('/getAllProjects',getAllProjects)
router.get('/getProjectById',getProjectById)
router.delete('/deleteProject',deleteProject)

// get all project name 
router.get('/getAllProjectNames',getAllProjectNames)


module.exports=router

