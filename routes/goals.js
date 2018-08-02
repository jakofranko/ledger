var express = require('express');
var router  = express.Router();
var Goal = require('../models/goal');

router.get('/', function(req, res, next) {
    let goal = new Goal();
    goal.getAll()
        .then(goals => {
            res.json({ goals });
            goal.close();
        })
        .catch(err => next(err));
});

router.post('/', function(req, res, next) {
    let goal = new Goal();
    goal.create(req.body)
        .then(goal => {
            res.json(goal);
            goal.close();
        })
        .catch(err => next(err))
});

router.get('/:id', function(req, res, next) {
    let goal = new Goal();
    goal.get(req.params.id)
        .then(goal => {
            res.json(goal);
            goal.close();
        })
        .catch(err => next(err));
});

router.put('/:id', function(req, res, next) {
    let goal = new Goal();
    goal.update(req.params.id, req.body)
        .then(goal => {
            res.json(goal);
            goal.close();
        })
        .catch(err => next(err));
});

router.delete('/:id', function(req, res, next) {
    let goal = new Goal();
    goal.delete(req.params.id)
        .then(goal => {
            res.json(goal);
            goal.close();
        })
        .catch(err => next(err));
});

module.exports = router;
