const mongoose = require('mongoose');

let paymentSchema = mongoose.Schema({
  nameType: {
    type: String,
    require: [true, 'Name is required'],
  },
  banks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bank',
    },
  ],
  status: {
    type: String,
    enum: ['Y', 'N'],
    default: 'Y',
  },
});

module.exports = mongoose.model('Payment', paymentSchema);
