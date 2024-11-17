
const express = require('express');




const authenticateUser = require('../../../middlewares/auth');
const upload = require('../../../middlewares/fileupload');
const { createInvoiceProject, updateInvoiceProject, showAllInvoiceProjects, showInvoiceProjectById } = require('../controllers/invoiceProject.controller');

const router = express.Router()

router.post('/createInvoiceProject',createInvoiceProject)
router.patch('/updateInvoiceProject',updateInvoiceProject)
router.get('/showAllInvoiceProjects',showAllInvoiceProjects)
router.get('/showInvoiceProjectById',showInvoiceProjectById)


module.exports=router


