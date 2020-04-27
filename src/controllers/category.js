module.exports.getCategoryList = (request, response) => {
  return response.status(200).json({
    getCategoryList: true,
  });
};

module.exports.get = (request, response) => {
  return response.status(200).json({
    getCategory: true,
  });
};

module.exports.create = (request, response) => {
  return response.status(200).json({
    createCategory: true,
  });
};

module.exports.update = (request, response) => {
  return response.status(200).json({
    updateCategory: true,
  });
};

module.exports.delete = (request, response) => {
  return response.status(200).json({
    deleteCategory: true,
  });
};
