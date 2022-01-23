var express = require("express");
var path = require("path")
let ejs = require('ejs')
let fs = require('fs')
var router = express.Router();

var generator = require('./generator');



router.get("/random", function(req, res) {
  var totalNumber = req.query.total;
  var repeatWeight = req.query.repeat || 0.3;
  var removeWeight = req.query.remove || 0.1;

  var array1 = generator.getRandomArray(totalNumber, 100);

  var final = generator.getRandomIndexes(array1, repeatWeight, removeWeight)

  fs.readFile(__dirname + '/index.html', 'utf-8', (err, html) => {
    res.send(ejs.render(html, final))
  })
});

module.exports = router;