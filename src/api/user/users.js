var express = require('express');
var router = express.Router();

const url = '/users'

// TODO: create services
router.get(url, function (req, res) {
    res.send('esta ruta es get');
});

router.post(url, function (req, res) {
    res.send('esta ruta es post');
});

router.put(`${url}/:id`, function (req, res) {
    res.send('esta ruta es put');
});

router.delete(`${url}/:id`, function (req, res) {
    res.send('esta ruta es delete');
});

module.exports = router;
