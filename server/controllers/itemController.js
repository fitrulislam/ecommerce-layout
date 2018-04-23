const Item = require('../models/item')

module.exports = {
  create: (req,res)=>{
    const newItem = new Item(req.body)
    newItem.save()
      .then(item=>{
        res.status(201).json({
          message: 'new item created',
          data: item
        })
      })
      .catch(err=>{
        res.status(500).json({
          message: 'item not created'
        })
      })
  },
  read: (req,res)=>{
    Item.find()
      .then(items=>{
        res.status(200).json({
          message: `all item data`,
          data: items
        })
      })
      .catch(err=>{
        res.status(404).json({
          message: 'item not found'
        })
      })
  },
  update: (req,res)=>{
    Item.update({
      _id: req.params.id
    },{
      $set: req.body
    })
      .then(item=>{
        res.status(200).json({
          message: 'item updated',
          data: item
        })
      })
      .catch(err=>{
        res.status(500).json({
          message: 'item not updated'
        })
      })
  },
  delete: (req,res)=>{
    Item.find({
      title: req.params.title
    })
      .then(item=>{
        Item.findByIdAndRemove({
          _id: item[0]._id
        })
          .then(item=>{
            res.status(200).json({
              message: 'item deleted',
              data: item
            })
          })
          .catch(err=>{
            res.status(500).json({
              message: 'item not deleted'
            })
          })
      })
      .catch(err=>{
        res.status(500).json({
          message: 'item not deleted'
        })
      })
  }
}
