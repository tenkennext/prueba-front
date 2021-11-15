const mongoose = require('mongoose');
const { Schema } = mongoose;

const Conference = new Schema({
  title: String,
  description: String,
  location: String,
  date: {
      type: Date,
      default: Date.now
  },
  quota: Number,
  owner: Object,
  state: {
      type: Boolean,
      default: true
  },
});

module.exports = mongoose.model('Conference', Conference);
