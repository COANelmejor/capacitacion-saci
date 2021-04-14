module.exports = function (req, res, next) {
  req.parametro = req.params.id;
  next()
}