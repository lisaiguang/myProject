var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var Card = require('../public/modules/Card');
    var card = new Card(1,1);
    res.render('layout', { title: card.getString(), main:'app' });
});

module.exports = router;
