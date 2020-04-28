const keys = require('./config/keys');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');

const analyticsRoute = require('./routes/analytics');
const authRoute = require('./routes/auth');
const categoryRoute = require('./routes/category');
const orderRoute = require('./routes/order');
const passportMiddleware = require('./middleware/passport');
const positionRoute = require('./routes/position');

mongoose.connect(keys.mongodbURI)
  .then(() => console.log('connected to MongoDB'))
  .catch(error => console.log('Couldn\'t connect to MongoDB', error));

app.use(passport.initialize());
passportMiddleware(passport);

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/auth', authRoute);
app.use('/api/analytics', passport.authenticate('jwt', { session: false }), analyticsRoute);
app.use('/api/category', passport.authenticate('jwt', { session: false }), categoryRoute);
app.use('/api/order', passport.authenticate('jwt', { session: false }), orderRoute);
app.use('/api/position', passport.authenticate('jwt', { session: false }), positionRoute);

module.exports = app;
