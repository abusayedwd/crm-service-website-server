
const express = require('express');



const { createProject, updateProject, showAllProjects, showProjectById } = require('../controllers/project.controllers');

const authenticateUser = require('../../../middlewares/auth');
const upload = require('../../../middlewares/fileupload');

const router = express.Router()

router.post('/createProject',authenticateUser,upload,createProject)
router.patch('/updateProject',authenticateUser,upload,updateProject)
router.get('/showAllProjects',showAllProjects)
router.get('/showProjectById',showProjectById)


module.exports=router