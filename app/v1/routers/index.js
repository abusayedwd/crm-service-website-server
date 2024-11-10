const express = require('express');

const userRouter=require('../routers/user.routers');
const aobutRouter=require('../routers/about.routers')
const projectRouter=require('../routers/project.routers')
const customerRouter=require('../routers/customer.router')
const serviceRouter=require('../routers/service.routers')
const employeeRouter=require('../routers/employee.routers')
const employeeUpdateRouter=require('../routers/updateEmployee.router')
// const employeePaymentrouter=require('../routers/emplyeePayment.routers')

// const locationRouter=require('../routers/location.routers');
// const authenticateUser = require('../../middlewares/auth');

const router = express.Router();

// Define your routes here
router.use('/users', userRouter);

// about us
router.use('/about-us',aobutRouter)

// dashboared 
router.use('/project',projectRouter)

// add customer
router.use('/customer-add',customerRouter)

router.use('/service',serviceRouter)

router.use('/employee-add',employeeRouter)

router.use('/employee-updated',employeeUpdateRouter)

// router.use('/employee-payment',employeePaymentrouter)

// user location 

// router.use('/location',authenticateUser,locationRouter)









  
  module.exports = router;