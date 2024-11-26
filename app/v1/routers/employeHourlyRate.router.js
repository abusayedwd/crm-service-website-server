
const express = require('express');



const authenticateUser = require('../../../middlewares/auth');
const { createEmployeeHourRate, updateEmployeeHourRate, getAllEmployeeHourRates, getEmployeeHourRateById, getAllEmployeNamesNotInHourlyRate } = require('../controllers/employehourRate');

const router = express.Router()

router.post('/createEmployeeHourRate',authenticateUser,createEmployeeHourRate)
router.patch('/updateEmployeeHourRate',authenticateUser,updateEmployeeHourRate)
router.get('/getAllEmployeeHourRates',getAllEmployeeHourRates)
router.get('/getEmployeeHourRateById',getEmployeeHourRateById)
router.get('/getAllEmployeNamesNotInHourlyRate',getAllEmployeNamesNotInHourlyRate)



module.exports=router

