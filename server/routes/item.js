const router = require('express').Router()
const itemController = require('../controllers/itemController')
const multer = require('multer')
const images = require('../middleware/images')
const { isUser } = require('../middleware/auth')

router
  .post('/create', isUser, images.multer.single('image'), images.sendUploadToGCS, itemController.create)
  .get('/read', itemController.read)
  .post('/delete/:id', isUser, itemController.delete)

module.exports = router
