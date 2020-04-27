module.exports.get = (request, response) => {
  return response.status(200).json({
    getOrder: true,
  });
};

module.exports.create = (request, response) => {
  return response.status(200).json({
    createOrder: true,
  });
};
