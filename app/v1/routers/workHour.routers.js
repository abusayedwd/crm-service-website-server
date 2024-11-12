
const express = require('express');





const authenticateUser = require('../../../middlewares/auth');
const { createWorkHour, getWorkHourById, getAllWorkHours, updateWorkHour, showWorkHours, showWorkHoursByProjectAndWeek } = require('../controllers/workhour.controller');



const router = express.Router()

router.post('/createWorkHour',authenticateUser,createWorkHour)
router.get('/showWorkHoursByProjectAndWeek',authenticateUser,showWorkHoursByProjectAndWeek)
router.get('/getAllWorkHours',authenticateUser,getAllWorkHours)
router.get('/getAllWorkHours',authenticateUser,getAllWorkHours)
router.patch('/updateWorkHour',authenticateUser,updateWorkHour)



module.exports=router

