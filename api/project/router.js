const express = require('express');
const Project = require('./model');
const { validateBody } = require('./p_middleware');
const router = express.Router();

router.get('/', (req, res) => {
  Project.findAll().then((resp) => {
    res.status(200).json(resp);
  });
});

router.post('/', validateBody, (req, res) => {
  Project.postProject(req.body)
    .then((resp) => {
      res.status(201).json(resp);
    })
    .catch((err) => {
      console.log(err);
    });
});


module.exports = router;