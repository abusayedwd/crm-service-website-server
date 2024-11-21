
const express = require('express');
const { createProjectList, showAllProjectLists } = require('../controllers/quotes.controller');









const router = express.Router()

router.post('/createProjectList',createProjectList)

router.get('/showAllProjectLists',showAllProjectLists)





module.exports=router
