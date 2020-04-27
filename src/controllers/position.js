module.exports.get = (request, response) => {
  return response.status(200).json({
    getPosition: true,
  });
};

module.exports.update = (request, response) => {
  return response.status(200).json({
    updatePosition: true,
  });
};

module.exports.delete = (request, response) => {
  return response.status(200).json({
    deletePosition: true,
  });
};

module.exports.create = (request, response) => {
  return response.status(200).json({
    createPosition: true,
  });
};
