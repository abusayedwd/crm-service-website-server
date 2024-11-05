
const express = require('express');
const { signUp, verifyCode, resendOtp, signIn, forgotPassword, cahngePassword, changePasswordUseingOldPassword } = require('../controllers/userController');

const router = express.Router()

router.post('/user-signup',signUp)
router.post('/verify-code',verifyCode)
router.post('/resendOtp',resendOtp)
router.post('/signIn',signIn)
router.post('/forgotPassword',forgotPassword)
router.post('/cahngePassword',cahngePassword)
router.post('/changePasswordUseingOldPassword',changePasswordUseingOldPassword)

module.exports=router