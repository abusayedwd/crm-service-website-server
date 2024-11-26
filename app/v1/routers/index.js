const express = require('express');

const userRouter=require('../routers/user.routers');
const aobutRouter=require('../routers/about.routers')
const projectRouter=require('../routers/project.routers')
const customerRouter=require('../routers/customer.router')
const serviceRouter=require('../routers/service.routers')
const employeeRouter=require('../routers/employee.routers')
const employeeUpdateRouter=require('../routers/updateEmployee.router')
const projectlistRouter=require('../routers/projectList.router')

const workHourRouters=require('../routers/workHour.routers');
const costRouters=require('../routers/cost.router');
const invoiceRouters=require('../routers/invoiceProject.routers');
const payemntInvoicceRouter=require('../routers/paymentRevaluate.router');
const quoterRouter=require('../routers/quote.router');
const hourlyRateRouter=require('../routers/employeHourlyRate.router');
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

router.use('/project-list',projectlistRouter)

router.use('/work-hours',workHourRouters)
router.use('/cost-in',costRouters)
router.use('/invoice-project',invoiceRouters)
router.use('/payment-invoice',payemntInvoicceRouter)
router.use('/qoute',quoterRouter)

router.use('/employe-hourlyRate',hourlyRateRouter)

// user location 

// router.use('/location',authenticateUser,locationRouter)









  
  module.exports = router;