var express = require('express');
var router  = express.Router();
var Goal = require('../models/goal');

router.get('/', function(req, res, next) {
    let goal = new Goal();
    goal.getAll()
        .then(goals => res.json({ goals }))
        .catch(err => next(err))
        .finally(() => goal.close());
});

router.post('/', function(req, res, next) {
    let goal = new Goal();
    goal.create(req.body)
        .then(goal => res.json(goal))
        .catch(err => next(err)
        .finally(() => goal.close()));
});

router.get('/:id', function(req, res, next) {
    let goal = new Goal();
    goal.get(req.params.id)
        .then(goal => res.json(goal))
        .catch(err => next(err))
        .finally(() => goal.close());
});

router.put('/:id', function(req, res, next) {
    let goal = new Goal();
    goal.update(req.params.id, req.body)
        .then(goal => res.json(goal))
        .catch(err => next(err))
        .finally(() => goal.close());
});

router.delete('/:id', function(req, res, next) {
    let goal = new Goal();
    goal.delete(req.params.id)
        .then(goal => res.json(goal))
        .catch(err => next(err))
        .finally(() => goal.close());
});

module.exports = router;
