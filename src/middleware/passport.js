const { Strategy, ExtractJwt } = require('passport-jwt');
const keys = require('../config/keys');
const User = require('../models/User');
const errorHandler = require('../utils/errorHandler');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.jwtSecret,
};

module.exports = passport => {
  passport.use(
    new Strategy(options, async (payload, done) => {
      try {
        const user = await User.findById(payload.userId).select('email id');
        done(null, user);
      } catch (e) {
        errorHandler(e);
      }
    }),
  );
};
