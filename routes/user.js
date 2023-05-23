const express = require('express')
const router = express.Router()

const userController = require('../controller/userController')
const upload = require('../middleware/multer')

router.post('/signup',userController.signUp)
router.post('/login',userController.login)

router.post('/upload-profile',upload.single("image"),userController.imageUpload)

module.exports = router