const Order = require('../models/Order');
const errorHandler = require('../utils/errorHandler');

/**
 * Return list of orders with pagination:
 * request.query.skip - skip items value,
 * request.query.take - take items count (items per page),
 * request.query.from - take items from date (included),
 * request.query.to - take items to date (included),
 * @param request
 * @param response
 * @returns {Promise<void>}
 */
module.exports.get = async (request, response) => {
  const { skip, take, from, to, sortBy } = request.query;
  const query = {
    user: request.user.id,
  };

  if (from || to) {
    query.date = new Date;
    if (from) {
      query.date.$gte = from;
    }
    if (to) {
      query.date.$lte = to;
    }
  }

  try {
    const orderList = await Order
      .find(query)
      .sort({ date: sortBy === 'desc' ? -1 : 1 })
      .skip(+skip)
      .limit(+take);

    const totalItems = await Order.countDocuments(query);

    response.status(200).json({
      list: orderList,
      total: totalItems,
    });
  } catch (e) {
    errorHandler(e);
  }
};

/**
 * Generate new order from order items (request.body.list)
 * @param request
 * @param response
 * @returns {Promise<void>}
 */
module.exports.create = async (request, response) => {
  try {
    const userId = request.user.id;
    const lastOrder = await Order
      .findOne({ user: userId })
      .sort({ date: -1 }); // newest first

    const maxOrderValue = lastOrder ? lastOrder.order : 0;

    const order = new Order({
      list: request.body.list,
      order: maxOrderValue + 1,
      user: userId,
    });

    await order.save();
    response.status(201).json(order);
  } catch (e) {
    errorHandler(e);
  }
};
