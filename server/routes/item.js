const router = require('express').Router()
const itemController = require('../controllers/itemController')

router
  .post('/create', itemController.create)
  .get('/read', itemController.read)
  .put('/:id', itemController.update)
  .post('/delete/:title', itemController.delete)

module.exports = router
