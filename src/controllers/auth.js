module.exports.login = (request, response) => {
  return response.status(200).json({
    login: true,
  });
};

module.exports.register = (request, response) => {
  return response.status(200).json({
    login: true,
  });
};
