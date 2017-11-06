var express = require('express');
var router  = express.Router();
var Log = require('../models/log');

router.get('/', function(req, res, next) {
    Log
        .getAll()
        .then(logs => res.json({ logs }))
        .catch(err => next(err));
});

router.post('/', function(req, res, next) {
    Log
        .create(req.body)
        .then(log => res.json(log))
        .catch(err => next(err));
});

router.get('/:id', function(req, res, next) {
    console.log("==========");
    console.log("Body: ", req.body);
    console.log("==========");
    console.log("Params: ", req.params);
    console.log("==========");
    Log
        .get(req.params.id)
        .then(log => res.json(log))
        .catch(err => next(err));
});

router.put('/:id', function(req, res, next) {
    console.log("==========");
    console.log("Body: ", req.body);
    console.log("==========");
    console.log("Params: ", req.params);
    console.log("==========");
    Log
        .update(req.params.id, req.body)
        .then(log => res.json(log))
        .catch(err => next(err));
});

router.delete('/:id', function(req, res, next) {
    console.log("==========");
    console.log("Body: ", req.body);
    console.log("==========");
    console.log("Params: ", req.params);
    console.log("==========");
    Log
        .delete(req.params.id)
        .then(log => res.json(log))
        .catch(err => next(err));
});

module.exports = router;