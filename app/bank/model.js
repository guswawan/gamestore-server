const mongoose = require('mongoose');

let bankSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Name is required'],
  },
  bankName: {
    type: String,
    require: [true, 'Coin is required'],
  },
  accountNumber: {
    type: Number,
    default: 0,
    require: [true, 'Account number is required'],
  },
});

module.exports = mongoose.model('Bank', bankSchema);
