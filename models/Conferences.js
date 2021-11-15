const mongoose = require('mongoose');
const { Schema } = mongoose;

const quotaSchema = new Schema({
  capacity: {
    type: Number
  },
  remain: {
    type: Number
  },
  subscribers: { type : Array }
});

const Conference = new Schema({
  title: String,
  description: String,
  location: String,
  date: {
      type: Date,
      default: Date.now
  },
  quota: quotaSchema,
  owner: Object,
  state: {
      type: Boolean,
      default: true
  },
});

module.exports = mongoose.model('Conference', Conference);
