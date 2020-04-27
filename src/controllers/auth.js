module.exports.login = (request, response) => {
  const { email, password } = request.body;
  return response.status(200).json({
    login: {
      email,
      password,
    }
  });
};

module.exports.register = (request, response) => {
  return response.status(200).json({
    login: true,
  });
};
