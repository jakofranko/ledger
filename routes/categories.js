var express = require('express');
var router  = express.Router();
var Category = require('../models/category');

router.get('/', function(req, res, next) {
   new Category()
        .getAll()
        .then(categories => res.json({ categories }))
        .catch(err => next(err))
        .close();
});

router.post('/', function(req, res, next) {
    new Category()
        .create(req.body)
        .then(category => res.json(category))
        .catch(err => next(err))
        .close();
});

router.get('/:id', function(req, res, next) {
    console.log("==========");
    console.log("Body: ", req.body);
    console.log("==========");
    console.log("Params: ", req.params);
    console.log("==========");
    new Category()
        .get(req.params.id)
        .then(category => res.json(category))
        .catch(err => next(err))
        .close();
});

router.put('/:id', function(req, res, next) {
    console.log("==========");
    console.log("Body: ", req.body);
    console.log("==========");
    console.log("Params: ", req.params);
    console.log("==========");
    new Category()
        .update(req.params.id, req.body)
        .then(category => res.json(category))
        .catch(err => next(err))
        .close();
});

router.delete('/:id', function(req, res, next) {
    console.log("==========");
    console.log("Body: ", req.body);
    console.log("==========");
    console.log("Params: ", req.params);
    console.log("==========");
    new Category()
        .delete(req.params.id)
        .then(category => res.json(category))
        .catch(err => next(err))
        .close();
});

module.exports = router;
