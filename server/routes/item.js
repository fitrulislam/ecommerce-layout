const router = require('express').Router()
const itemController = require('../controllers/itemController')
const multer = require('multer')
const { sendFileGCS } = require('../middlewares/uploadGCS')
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024
  }
})

router
  .post('/create', itemController.create)
  .get('/read', upload.fields([{name: 'link', maxCount: 1}]), sendFileGCS, itemController.read)
  .put('/edit/:id', itemController.update)
  .post('/delete/:title', itemController.delete)

module.exports = router
