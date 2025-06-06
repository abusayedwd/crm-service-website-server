
const express = require('express');


const { createCustomer, updateCustomer, showAllCustomers, showCustomerById, deleteCustomer, getAllCustomerNames } = require('../controllers/customer.controllers');
const authenticateUser = require('../../../middlewares/auth');
const upload = require('../../../middlewares/fileupload');

const router = express.Router()

router.post('/createCustomer',authenticateUser,upload,createCustomer)
router.patch('/updateCustomer',authenticateUser,upload,updateCustomer)
router.get('/showAllCustomers',showAllCustomers)
router.get('/showCustomerById',showCustomerById)
router.delete('/deleteCustomer',deleteCustomer)

router.get('/getAllCustomerNames',getAllCustomerNames)

module.exports=router