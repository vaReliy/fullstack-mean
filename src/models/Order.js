const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const positionSchema = new Schema({
  date: {
    type: String,
    default: Date.now,
  },
  order: {
    type: Number,
    required: true,
  },
  list: [{
    name: {
      type: String,
    },
    quantity: {
      type: Number,
    },
    cost: {
      type: Number,
    },
  }],
  user: {
    ref: 'users',
    type: Schema.Types.ObjectID,
  },
});

module.exports = mongoose.model('orders', positionSchema);
