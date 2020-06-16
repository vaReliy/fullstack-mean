const errorHandler = require('../utils/errorHandler');
const Position = require('../models/Position');

module.exports.getByCategory = async (request, response) => {
  try {
    const targetCategoryId = request.params.categoryId;
    const targetUserId = request.user.id;
    const positionList = await Position.find({
      category: targetCategoryId,
      user: targetUserId,
    });

    response.status(200).json(positionList);
  } catch (e) {
    errorHandler(e);
  }

  return response.status(200).json({
    getPosition: true,
  });
};

module.exports.update = async (request, response) => {
  try {
    const position = await Position.findOneAndUpdate(
      { _id: request.params.id },
      { $set: request.body },
      { new: true }, // result after update in DB
    );

    response.status(201).json(position);
  } catch (e) {
    errorHandler(e);
  }
};

module.exports.delete = async (request, response) => {
  try {
    const targetPosition = await Position.remove({
      _id: request.params.id,
    });

    response.status(200).json({
      message: 'Successfully removed!',
      data: targetPosition,
    });
  } catch (e) {
    errorHandler(e);
  }
};

module.exports.create = async (request, response) => {
  try {
    const { name, cost, category } = request.body;
    const position = await new Position({
      name,
      cost,
      category,
      user: request.user.id,
    }).save();

    response.status(201).json(position);
  } catch (e) {
    errorHandler(e);
  }
};
