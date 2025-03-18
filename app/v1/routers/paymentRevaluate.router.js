
// const express = require('express');



// const authenticateUser = require('../../../middlewares/auth');
// const upload = require('../../../middlewares/fileupload');
// const { createRevaluePayment} = require('../controllers/revaluePayment');

// const router = express.Router()

// router.post('/createRevaluePayment',authenticateUser,upload,createRevaluePayment)



// module.exports=router


// Route code==============

const express = require('express');
const router = express.Router();
const {handleFileUpload, getRevoultPayments}=require('../controllers/revaluePayment')
const uploader=require('../../../middlewares/csvuplode')
// Use the uploader middleware for CSV file upload
const uploadMiddleware = uploader('uploads/csv');
// Route for uploading CSV file
router.post('/upload', uploadMiddleware.single('csvFile'), handleFileUpload);
// Route for getting all payments
router.get('/getRevoultPayments', getRevoultPayments);
// router.put('/editPayment/:paymentId', editPayment);
// router.get('/getPaymentStats', getPaymentStats);
// router.get('/getPaymentStats', getPaymentStats);
// router.delete('/deleteRevoultPayment/:id', deleteRevoultPayment);
module.exports = router;