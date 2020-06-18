const errorHandler = require('../utils/errorHandler')

module.exports.overview = (request, response) => {
  try {
    // todo values






    response.status(200).json({
      gain: {
        percent: 0,
        compare: 0,
        yesterday: 0,
        isHigher: false,
      },
      order: {
        percent: 0,
        compare: 0,
        yesterday: 0,
        isHigher: false,
      },
    });
  } catch (e) {
    errorHandler(e);
  }
};

module.exports.analytics = (request, response) => {
  return response.status(200).json({
    analytics: true,
  });
};
