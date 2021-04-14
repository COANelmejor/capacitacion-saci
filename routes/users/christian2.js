module.exports = function (req, res) {
  res.send({
    nombre: 'Christian Obed Arana Navas',
    parametro: req.parametro,
    lang: req.language
  })
}