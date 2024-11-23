
const express = require('express');
const { createProjectList, showAllProjectLists, deleteProjectList } = require('../controllers/quotes.controller');









const router = express.Router()

router.post('/createProjectList',createProjectList)

router.get('/showAllProjectLists',showAllProjectLists)
router.delete('/deleteProjectList',deleteProjectList)




module.exports=router
