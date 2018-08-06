const express = require('express');
const router  = express.Router();
const Interval = require('../models/interval');

router.get('/', function(req, res, next) {
    const interval = new Interval();
    interval.getAll()
            .then(intervals => res.json({ intervals }))
            .catch(err => next(err));
});

module.exports = router;
