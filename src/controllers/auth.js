const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const User = require('../models/User');

module.exports.login = async (request, response) => {
  const { email, password } = request.body;
  const candidate = await User.findOne({ email: email });

  if (candidate) {
    const isValid = bcrypt.compareSync(password, candidate.password);
    if (isValid) {
      const token = jwt.sign({
        email: candidate.email,
        userId: candidate._id,
      }, keys.jwtSecret, { expiresIn: keys.jwtExpiresIn });

      response.status(200).json({ token });
    } else {
      response.status(401).json({ // fixme: merge it?
        message: `The user with entered email and(or) password are not correct!`,
      });
    }
  } else {
    response.status(401).json({ // fixme: merge it?
      message: `The user with entered email and(or) password are not correct!`,
    });
  }
};

module.exports.register = async (request, response) => {
  const { email, password } = request.body;
  const candidate = await User.findOne({ email: email });

  if (candidate) {
    response.status(409).json({
      message: `The user with email ${email} has already exist!`,
    });
  } else {
    const salt = bcrypt.genSaltSync(10);

    const user = new User({
      email,
      password: bcrypt.hashSync(password, salt),
    });

    try {
      await user.save();
      response.status(201).json({
        message: `The user ${email} has been created success!`,
        data: user,
      });
    } catch (e) {
      console.error(e);
      // todo: handle error!
    }
  }
};
