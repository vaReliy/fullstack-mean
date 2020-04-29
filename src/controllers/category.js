const errorHandler = require('../utils/errorHandler');
const Category = require('../models/Category');
const Position = require('../models/Position');

module.exports.getCategoryList = async (request, response) => {
  try {
    const categoryList = await Category.find({ user: request.user.id });
    response.status(200).json(categoryList);
  } catch (e) {
    errorHandler(e);
  }
};

module.exports.getById = async (request, response) => {
  try {
    const category = await Category.findById(request.params.id);
    response.status(200).json(category);
  } catch (e) {
    errorHandler(e);
  }
};

module.exports.create = (request, response) => { // todo
  return response.status(200).json({
    createCategory: true,
  });
};

module.exports.update = async (request, response) => {
  try {
    const category = await Category.findOneAndUpdate(
      { _id: request.params.id },
      { $set: request.body },
      { new: true }, // result after update in DB
    );

    response.status(201).json(category);
  } catch (e) {
    errorHandler(e);
  }
};

module.exports.delete = async (request, response) => {
  try {
    const targetCategoryId = response.params.id;
    const targetCategory = await Category.remove({ _id: targetCategoryId });
    const targetPosition = await Position.remove({ _id: targetCategoryId });

    response.status(200).json({
      message: 'Successfully removed!',
      data: {
        category: targetCategory,
        position: targetPosition,
      },
    });
  } catch (e) {
    errorHandler(e);
  }
};
