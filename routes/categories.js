var express = require('express');
var router  = express.Router();
var Category = require('../models/category');

router.get('/', function(req, res, next) {
   Category
        .getAll()
        .then(categories => res.json({ categories }))
        .catch(err => next(err));
});

router.post('/', function(req, res, next) {
    Category
        .create(req.body)
        .then(category => res.json(category))
        .catch(err => next(err));
});

router.get('/:id', function(req, res, next) {
    console.log("==========");
    console.log("Body: ", req.body);
    console.log("==========");
    console.log("Params: ", req.params);
    console.log("==========");
    Category
        .get(req.params.id)
        .then(category => res.json(category))
        .catch(err => next(err));
});

router.put('/:id', function(req, res, next) {
    console.log("==========");
    console.log("Body: ", req.body);
    console.log("==========");
    console.log("Params: ", req.params);
    console.log("==========");
    Category
        .update(req.params.id, req.body)
        .then(category => res.json(category))
        .catch(err => next(err));
});

router.delete('/:id', function(req, res, next) {
    console.log("==========");
    console.log("Body: ", req.body);
    console.log("==========");
    console.log("Params: ", req.params);
    console.log("==========");
    Category
        .delete(req.params.id)
        .then(category => res.json(category))
        .catch(err => next(err));
});

module.exports = router;