const mongoose = require('mongoose');
const { Schema } = mongoose;

const Conference = new Schema({
  title: String,
  description: String,
  quota: Number,
  state: {
      type: Boolean,
      default: true
  },
});

module.exports = mongoose.model('Conference', Conference);
