var express = require('express');
var router  = express.Router();
var Category = require('../models/category');

router.get('/', function(req, res, next) {
   let category = new Category();
    category.getAll()
        .then(categories => {
            category.close();
            res.json({ categories });
        })
        .catch(err => next(err));
});

router.post('/', function(req, res, next) {
    let category = new Category();
    category.create(req.body)
        .then(category => {
            category.close();
            res.json(category);
        })
        .catch(err => next(err));
});

router.get('/:id', function(req, res, next) {
    let category = new Category();
    category.get(req.params.id)
        .then(category => {
            category.close();
            res.json(category);
        })
        .catch(err => next(err));
});

router.put('/:id', function(req, res, next) {
    let category = new Category();
    category.update(req.params.id, req.body)
        .then(category => {
            category.close();
            res.json(category);
        })
        .catch(err => next(err));
});

router.delete('/:id', function(req, res, next) {
    let category = new Category();
    category.delete(req.params.id)
        .then(category => {
            category.close();
            res.json(category)
        })
        .catch(err => next(err));
});

module.exports = router;
