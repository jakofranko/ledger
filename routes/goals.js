var express = require('express');
var router  = express.Router();
var Goal = require('../models/goal');

router.get('/', function(req, res, next) {
    Goal
        .getAll()
        .then(goals => res.json({ goals }))
        .catch(err => next(err));
});

router.post('/', function(req, res, next) {
    Goal
        .create(req.body)
        .then(goal => res.json(goal))
        .catch(err => next(err));
});

router.get('/:id', function(req, res, next) {
    console.log("==========");
    console.log("Body: ", req.body);
    console.log("==========");
    console.log("Params: ", req.params);
    console.log("==========");
    Goal
        .get(req.params.id)
        .then(goal => res.json(goal))
        .catch(err => next(err));
});

router.put('/:id', function(req, res, next) {
    console.log("==========");
    console.log("Body: ", req.body);
    console.log("==========");
    console.log("Params: ", req.params);
    console.log("==========");
    Goal
        .update(req.params.id, req.body)
        .then(goal => res.json(goal))
        .catch(err => next(err));
});

router.delete('/:id', function(req, res, next) {
    console.log("==========");
    console.log("Body: ", req.body);
    console.log("==========");
    console.log("Params: ", req.params);
    console.log("==========");
    Goal
        .delete(req.params.id)
        .then(goal => res.json(goal))
        .catch(err => next(err));
});

module.exports = router;