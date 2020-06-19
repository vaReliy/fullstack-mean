const errorHandler = require('../utils/errorHandler');
const Order = require('../models/Order');
const moment = require('moment');

module.exports.overview = async (request, response) => {
  try {
    const allOrders = await Order
        .find({user: request.user.id})
        .sort({ date: 'desc' });
    const ordersMap = getOrdersMap(allOrders);
    const totalOrdersCount = allOrders.length;
    // active day -> if order exist
    const activeDaysCount = Object.keys(ordersMap).length;
    const ordersPerDay = Math.floor(totalOrdersCount / activeDaysCount);
    const yesterday = moment().add(-1, 'd').format('DD.MM.YYYY');
    const yesterdayOrders = ordersMap[yesterday] || [];
    const orderCountYesterday = yesterdayOrders.length;
    // ((yesterday_order_count / orders_per_day) - 1) * 100
    const ordersPercent = +(((orderCountYesterday / ordersPerDay) - 1) * 100).toFixed(2);
    const totalGain = calculatePrice(allOrders);
    const gainPerDay = Math.floor(totalGain / activeDaysCount);
    const gainYesterday = calculatePrice(yesterdayOrders);
    // ((yesterday_gain / gain_per_day) - 1) * 100
    const gainPercent = +(((gainYesterday / gainPerDay) - 1) * 100).toFixed(2);
    const gainCompare = gainYesterday - gainPerDay;
    const ordersCountCompare = orderCountYesterday - ordersPerDay;
    const responseData = {
      gain: {
        percent: Math.abs(gainPercent),
        compare: Math.abs(gainCompare),
        yesterday: gainYesterday,
        isHigher: gainPercent > 0,
      },
      order: {
        percent: Math.abs(ordersPercent),
        compare: Math.abs(ordersCountCompare),
        yesterday: orderCountYesterday,
        isHigher: ordersPercent > 0,
      },
    };

    response.status(200).json(responseData);
  } catch (e) {
    errorHandler(e);
  }
};

module.exports.analytics = (request, response) => {
  return response.status(200).json({
    analytics: true,
  });
};

/**
 * Create ordersMap from ordersList filtered by date.
 * Key: orderDate as formatted string: 'DD.MM.YYYY'
 * Value: Order[]
 * Example output:
 * {
 *     '17.06.2020': [ Order, Order, ..., Order ]
 *     '18.06.2020': [ Order, Order, ..., Order ]
 *     '19.06.2020': [ Order, Order, ..., Order ]
 * }
 * @param orders: Order[]
 * @returns {{}}
 */
function getOrdersMap(orders = []) {
  const map = {};
  orders.forEach(order => {
    const date = moment(+order.date).format('DD.MM.YYYY');

    if (!map[date]) {
      map[date] = [];
    }

    map[date].push(order);
  });
  return map;
}

/**
 * Calculating total cost amount of order list
 * @param orders: Order[]
 * @returns { number }
 */
function calculatePrice(orders = []) {
  const result = orders.reduce((gain, order) => {
    gain += order.list.reduce((orderCost, position) => {
      orderCost += position.quantity * position.cost;
      return orderCost;
    }, 0);
    return gain;
  }, 0);
  return +result.toFixed(2);
}
