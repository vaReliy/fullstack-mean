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

module.exports.create = async (request, response) => {
  try {
    const category = new Category({
      name: request.body.name,
      imageSrc: request.file ? request.file.path : '',
      user: request.user.id,
    });
    await category.save();
    response.status(200).json(category);
  } catch (e) {
    errorHandler(e);
  }
};

module.exports.update = async (request, response) => {
  try {
    const data = {};
    data.name = request.body.name;
    if (request.file) { // multer
      data.imageSrc = request.file.path;
    }

    const category = await Category.findOneAndUpdate(
      { _id: request.params.id },
      { $set: data },
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
