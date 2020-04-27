const keys = require('config/keys');
// const keys = require('./config/keys.orig');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const analyticsRoute = require('./routes/analytics');
const authRoute = require('./routes/auth');
const categoryRoute = require('./routes/category');
const orderRoute = require('./routes/order');
const positionRoute = require('./routes/position');

mongoose.connect(keys.mongodbURI)
  .then(() => console.log('connected to MongoDB'))
  .catch(error => console.log('Couldn\'t connect to MongoDB', error));

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/analytics', analyticsRoute);
app.use('/api/auth', authRoute);
app.use('/api/category', categoryRoute);
app.use('/api/order', orderRoute);
app.use('/api/position', positionRoute);

module.exports = app;
