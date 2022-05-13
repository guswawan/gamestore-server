const mongoose = require('mongoose');

let paymentSchema = mongoose.Schema(
  {
    paymentType: {
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
  },
  { timestamps: true }
);

module.exports = mongoose.model('Payment', paymentSchema);
