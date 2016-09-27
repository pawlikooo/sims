var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  var url = 'https://github.com/pawlikooo/sims'
  var title = 'Instant Messenger'
  res.render('index', {
    title: title,
    url: url
  })
})

module.exports = router
