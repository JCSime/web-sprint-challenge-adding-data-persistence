const express = require('express');
const { validateBody, checkResourceNameIsUnique } = require('./r_middleware');
const Resource = require('./model');
const router = express.Router();

router.get('/', (req, res) => {
  Resource.findAll().then((resp) => {
    res.status(200).json(resp);
  });
});

router.post('/', validateBody, checkResourceNameIsUnique, (req, res) => {
  Resource.postResource(req.body)
    .then((resp) => {
      res.status(201).json(resp);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;