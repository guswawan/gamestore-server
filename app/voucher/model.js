const mongoose = require('mongoose');

let voucherSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, 'Name is required'],
    },
    status: {
      type: String,
      enum: ['Y', 'N'],
      default: 'Y',
    },
    thumbnail: {
      type: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
    nominals: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Nominal',
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    price: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Voucher', voucherSchema);
