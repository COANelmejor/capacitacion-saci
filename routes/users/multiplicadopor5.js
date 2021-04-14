module.exports = function (req, res) {
  var numeroParseado = parseFloat(req.params.numero);
  var multiplicacion = numeroParseado * 5
  res.status(200).send({
    resultado: multiplicacion
  })
}