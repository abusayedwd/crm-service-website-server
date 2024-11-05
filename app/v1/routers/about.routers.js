
const express = require('express');

const { showAboutUs, updateAboutUs } = require('../controllers/aboutUs.controller');
const authenticateUser = require('../../../middlewares/auth');

const router = express.Router()

router.get('/showAboutUs',authenticateUser,showAboutUs)
router.patch('/updateAboutUs',authenticateUser,updateAboutUs)

module.exports=router