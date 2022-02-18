const Resource = require("./model");

const validateId = (req, res, next) => {
  Resource.getByID(req.params.resource_id)
    .then((resp) => {
      if (resp) {
        req.resource = req.body;
        next();
      } else {
        res.status(404).json({ message: 'That ID could not be found' });
      }
    })
    .catch(next);
};

const validateBody = (req, res, next) => {
  const { resource_name } = req.body;
  if (
    !resource_name ||
    typeof resource_name !== 'string' ||
    resource_name === ''
  ) {
    res.status(400).json({ message: 'Name is required for resource' });
  } else {
    next();
  }
};

const checkResourceNameIsUnique = async (req, res, next) => {
  const resources = await Resource.findAll();
  const filteredResources = resources.filter((resource) => {
    return resource.resource_name === req.body.resource_name.trim();
  });
  if (filteredResources.length >= 1) {
    next({
      status: 400,
      message: 'That resource already exists',
    });
  }
  next();
};

module.exports = {
  validateId,
  validateBody,
  checkResourceNameIsUnique,
};