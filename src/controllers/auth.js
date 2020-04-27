const bcrypt = require('bcryptjs');
const User = require('../models/User');

module.exports.login = (request, response) => {
  const { email, password } = request.body;
  return response.status(200).json({
    login: {
      email,
      password,
    }
  });
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
