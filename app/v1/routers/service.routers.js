
const express = require('express');




const authenticateUser = require('../../../middlewares/auth');
const upload = require('../../../middlewares/fileupload');
const { createService, updateService, getAllServices, getServiceById, deleteService } = require('../controllers/Service.controller');

const router = express.Router()

router.post('/createService',authenticateUser,upload,createService)
router.patch('/updateService',authenticateUser,upload,updateService)
router.get('/getAllServices',getAllServices)
router.get('/getServiceById',getServiceById)
router.delete('/deleteService',deleteService)


module.exports=router

