
const express = require('express');


const authenticateUser = require('../../../middlewares/auth');
const { createPayment, updatePayment, getAllPayments, getPaymentById, deletePayment } = require('../controllers/employeePayment.controller');

const router = express.Router()

router.post('/createPayment',createPayment)
router.patch('/updatePayment',authenticateUser,updatePayment)
router.get('/getAllPayments',getAllPayments)
router.get('/getPaymentById',getPaymentById)
router.delete('/deletePayment',deletePayment)


module.exports=router

