
const express = require('express');




const authenticateUser = require('../../../middlewares/auth');
const upload = require('../../../middlewares/fileupload');
const { updateEmployeeHourlyRate } = require('../controllers/updateEmployee.controller');

const router = express.Router()

router.patch('/updateEmployeeHourlyRate',updateEmployeeHourlyRate)



module.exports=router