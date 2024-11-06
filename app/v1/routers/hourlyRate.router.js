
const express = require('express');


const authenticateUser = require('../../../middlewares/auth');
const { createHourlyRate, updateHourlyRate, getHourlyRateById, getAllHourlyRates, deleteHourlyRate } = require('../controllers/hourlyrate.controller');

const router = express.Router()

router.post('/createHourlyRate',createHourlyRate)
router.patch('/updateHourlyRate',authenticateUser,updateHourlyRate)
router.get('/getHourlyRateById',getHourlyRateById)
router.get('/getAllHourlyRates',getAllHourlyRates)
router.delete('/deleteHourlyRate',deleteHourlyRate)


module.exports=router

