var express = require('express');
var router  = express.Router();
var Promise = require('bluebird');
var db      = require('sqlite');



router.get('/', function(req, res, next) {
    try {
        db.open('./log.sqlite')
            .then(() => db.all('SELECT * FROM Intervals'))
            .then(intervals => res.json({ intervals }))
            .catch(err => next(err));
    } catch(e) {
        res.send(e);
    }

});

module.exports = router;