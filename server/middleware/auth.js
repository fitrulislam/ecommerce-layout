const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

function isUser(req,res,next){
  if(req.headers.token){
    let decoded = jwt.verify(req.headers.token, secret)
    if (decoded.role == 'admin' && decoded.id == '5adecbc865d9c05155f3d72b') {
      next()
    } else {
      res.status(404).json({
        message: 'you are not admin'
      })
    }
  } else {
    res.status(404).json({
      message: 'login first'
    })
  }
}

module.exports = {
  isUser: isUser
}
