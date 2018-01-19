var express = require('express');
var router  = express.Router();
var Milestones = require('../models/milestone');

router.get('/', function(req, res, next) {
   Milestones
        .getAll()
        .then(milestones => res.json({ milestones }))
        .catch(err => next(err));
});

router.get('/done', function(req, res, next) {
    Milestones
        .getDone()
        .then(milestones => res.json({ milestones }))
        .catch(err => next(err));
});

router.get('/not-done', function(req, res, next) {
    Milestones
        .getNotDone()
        .then(milestones => res.json({ milestones }))
        .catch(err => next(err));
});

router.post('/', function(req, res, next) {
    Milestones
        .create(req.body)
        .then(milestone => res.json(milestone))
        .catch(err => next(err));
});

router.get('/:id', function(req, res, next) {
    console.log("==========");
    console.log("Body: ", req.body);
    console.log("==========");
    console.log("Params: ", req.params);
    console.log("==========");
    Milestones
        .get(req.params.id)
        .then(milestone => res.json(milestone))
        .catch(err => next(err));
});

router.put('/:id', function(req, res, next) {
    console.log("==========");
    console.log("Body: ", req.body);
    console.log("==========");
    console.log("Params: ", req.params);
    console.log("==========");
    Milestones
        .update(req.params.id, req.body)
        .then(milestone => res.json(milestone))
        .catch(err => next(err));
});

router.delete('/:id', function(req, res, next) {
    console.log("==========");
    console.log("Body: ", req.body);
    console.log("==========");
    console.log("Params: ", req.params);
    console.log("==========");
    Milestones
        .delete(req.params.id)
        .then(milestone => res.json(milestone))
        .catch(err => next(err));
});

module.exports = router;