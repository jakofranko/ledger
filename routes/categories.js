var express = require('express');
var router  = express.Router();
var Category = require('../models/category');

router.get('/', function(req, res, next) {
   let category = new Category();
    category.getAll()
        .then(categories => res.json({ categories }))
        .catch(err => next(err))
        .finally(() => category.close());
});

router.post('/', function(req, res, next) {
    let category = new Category();
    category.create(req.body)
        .then(category => res.json(category))
        .catch(err => next(err))
        .finally(() => category.close());
});

router.get('/:id', function(req, res, next) {
    let category = new Category();
    category.get(req.params.id)
        .then(category => res.json(category))
        .catch(err => next(err))
        .finally(() => category.close());
});

router.put('/:id', function(req, res, next) {
    let category = new Category();
    category.update(req.params.id, req.body)
        .then(category => res.json(category))
        .catch(err => next(err))
        .finally(() => category.close());
});

router.delete('/:id', function(req, res, next) {
    let category = new Category();
    category.delete(req.params.id)
        .then(category => res.json(category))
        .catch(err => next(err))
        .finally(() => category.close());
});

module.exports = router;
