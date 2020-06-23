const keys = require('./config/keys');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
const path = require('path');

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
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/auth', authRoute);
app.use('/api/analytics', passport.authenticate('jwt', { session: false }), analyticsRoute);
app.use('/api/category', passport.authenticate('jwt', { session: false }), categoryRoute);
app.use('/api/order', passport.authenticate('jwt', { session: false }), orderRoute);
app.use('/api/position', passport.authenticate('jwt', { session: false }), positionRoute);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/dist/client'));

    app.get('*', (request, response) => {
        response.sendfile(path.resolve(
            __dirname, 'client', 'dist', 'client', 'index.html'
        ));
    });
}

module.exports = app;
