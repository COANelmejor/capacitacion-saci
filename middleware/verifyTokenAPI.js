module.exports = function(req, res, next) {
  if (req.method == 'GET') {
    if (process.env.APITOKEN == req?.headers?.token) {
      next()
    } else {
      res.status(401).send({
        message: 'API Token no autorizado'
      })
    }
  } else {
    res.status(403).send({
      message: 'El metodo no está permitido ejecutarse.'
    })
  }
}