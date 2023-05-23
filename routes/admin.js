const express = require('express')
const router = express.Router()

const adminController = require('../controller/adminController')

router.post('/login',adminController.login)
router.post('/adduser',adminController.addUser)

router.get('/getusers',adminController.getUsers)
router.get('/getuser/:id([0-9a-fA-F]{24})',adminController.getUser)

router.delete('/deleteuser/:id([0-9a-fA-F]{24})',adminController.deleteUser)

router.patch('/edituser',adminController.editUser)


module.exports = router