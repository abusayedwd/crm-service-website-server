
const express = require('express');


const authenticateUser = require('../../../middlewares/auth');
const { createCost, getAllCosts, getCostById, totalCost, totalRevinew } = require('../controllers/cost.controller');


const router = express.Router()

router.post('/createCost',authenticateUser,createCost)
router.get('/getAllCosts',authenticateUser,getAllCosts)
router.get('/getCostById',authenticateUser,getCostById)
router.get('/totalCost',authenticateUser,totalCost)

// totla revinew of this app
router.get('/totalRevinew',totalRevinew)



module.exports=router
