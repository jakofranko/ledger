var express = require('express');
var router  = express.Router();
var Milestone = require('../models/milestone');

router.get('/', function(req, res, next) {
   const m = new Milestone();
    m.getAll()
    .then(milestones => res.json({ milestones }))
    .catch(err => next(err))
    .finally(() => m.close());
});

router.get('/done', function(req, res, next) {
    const m = new Milestone();
    m.getDone()
    .then(milestones => res.json({ milestones }))
    .catch(err => next(err))
    .finally(() => m.close());
});

router.get('/not-done', function(req, res, next) {
    const m = new Milestone();
    m.getNotDone()
    .then(milestones => res.json({ milestones }))
    .catch(err => next(err))
    .finally(() => m.close());
});

router.post('/', function(req, res, next) {
    const m = new Milestone();
    m.create(req.body)
    .then(milestone => res.json(milestone))
    .catch(err => next(err))
    .finally(() => m.close());
});

router.get('/:id', function(req, res, next) {
    const m = new Milestone();
    m.get(req.params.id)
    .then(milestone => res.json(milestone))
    .catch(err => next(err))
    .finally(() => m.close());
});

router.put('/:id', function(req, res, next) {
    const m = new Milestone();
    m.update(req.params.id, req.body)
    .then(milestone => res.json(milestone))
    .catch(err => next(err))
    .finally(() => m.close());
});

router.delete('/:id', function(req, res, next) {
    const m = new Milestone();
    m.delete(req.params.id)
    .then(milestone => res.json(milestone))
    .catch(err => next(err))
    .finally(() => m.close());
});

module.exports = router;
