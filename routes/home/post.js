module.exports = function (req, res, next) {
  res.send({
    language: req.language
  });
}