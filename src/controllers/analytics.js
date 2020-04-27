module.exports.overview = (request, response) => {
  return response.status(200).json({
    overview: true,
  });
};

module.exports.analytics = (request, response) => {
  return response.status(200).json({
    analytics: true,
  });
};
