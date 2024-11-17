
const express = require('express');


const authenticateUser = require('../../../middlewares/auth');
const { createCost, getAllCosts, getCostById, totalCost } = require('../controllers/cost.controller');


const router = express.Router()

router.post('/createCost',authenticateUser,createCost)
router.get('/getAllCosts',authenticateUser,getAllCosts)
router.get('/getCostById',authenticateUser,getCostById)
router.get('/totalCost',authenticateUser,totalCost)



module.exports=router
