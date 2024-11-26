
const express = require('express');



const authenticateUser = require('../../../middlewares/auth');
const upload = require('../../../middlewares/fileupload');
const { createRevaluePayment, getAllRevaluePayments, getRevaluePaymentById, updateRevaluePayment, deleteRevaluePayment } = require('../controllers/revaluePayment');

const router = express.Router()

router.post('/createRevaluePayment',authenticateUser,upload,createRevaluePayment)
router.patch('/updateRevaluePayment',authenticateUser,upload,updateRevaluePayment)
router.get('/getRevaluePaymentById',getRevaluePaymentById)
router.get('/getAllRevaluePayments',getAllRevaluePayments)
router.delete('/deleteRevaluePayment',deleteRevaluePayment)


module.exports=router

