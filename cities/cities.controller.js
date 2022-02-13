const express = require('express');
const router = express.Router();
const cityService = require('./city.service');

// routes
router.post('/register', register);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function register(req, res, next) {
    cityService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    cityService.getAll()
        .then(citys => res.json(citys))
        .catch(err => next(err));
}

function getById(req, res, next) {
    cityService.getById(req.params.id)
        .then(city => city ? res.json(city) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    cityService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    cityService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}