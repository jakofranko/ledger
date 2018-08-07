const express = require('express');
const router  = express.Router();
const Log = require('../models/log');

router.get('/', function(req, res, next) {
    const l = new Log();
    l.getAll()
    .then(logs => res.json({ logs }))
    .catch(err => next(err))
    .finally(() => l.close());
});

router.post('/', function(req, res, next) {
    const l = new Log();
    l.create(req.body)
    .then(log => res.json(log))
    .catch(err => next(err))
    .finally(() => l.close());
});

router.get('/:id', function(req, res, next) {
    const l = new Log();
    l.get(req.params.id)
    .then(log => res.json(log))
    .catch(err => next(err))
    .finally(() => l.close());
});

router.put('/:id', function(req, res, next) {
    const l = new Log();
    l.update(req.params.id, req.body)
    .then(log => res.json(log))
    .catch(err => next(err))
    .finally(() => l.close());
});

router.delete('/:id', function(req, res, next) {
    const l = new Log();
    l.delete(req.params.id)
    .then(log => res.json(log))
    .catch(err => next(err))
    .finally(() => l.close());
});

module.exports = router;
