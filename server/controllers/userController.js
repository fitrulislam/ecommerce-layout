const User = require('../models/user')
const {hasher} = require('../helpers/hasher')
const jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')
require('dotenv').config()
const secret = process.env.SECRET

module.exports = {
  signup: (req,res)=>{
    let obj = {
      username: req.body.username,
      password: hasher(req.body.password)
    }
    const newUser = new User(obj)
    newUser.save()
      .then(user=>{
        let token = jwt.sign({id: user._id}, secret)
        res.status(201).json({
          message: 'user created',
          data: user,
          token: token
        })
      })
      .catch(err=>{
        res.status(500).json({
          message: 'user not created'
        })
      })
  },
  signin: (req,res)=>{
    console.log(req.body)
    User.find({
      username: req.body.username
    })
      .then(user=>{
        console.log(user)
        console.log(secret)
        if(user.length>0){
          let compare = bcrypt.compareSync(req.body.password, user[0].password)
          console.log(compare)
          if(compare==true){
            let token = jwt.sign({id: user[0]._id}, secret)
            res.status(200).json({
              message: 'user successful login',
              token: token
            })
          } else {
            res.status(404).json({
              message: 'wrong username/password'
            })
          }
        } else {
          res.status(404).json({
            message: 'user not found'
          })
        }
      })
      .catch(err=>{
        res.status(500).json({
          message: 'data error'
        })
      })
  }
}
