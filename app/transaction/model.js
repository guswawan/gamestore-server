const mongoose = require('mongoose');

let transactionSchema = mongoose.Schema(
  {
    historyVoucherTopup: {
      gameName: { type: String, require: [true, 'Game name is required'] },
      category: { type: String, require: [true, 'Category is required'] },
      thumbnail: { type: String },
      coinName: { type: String, require: [true, 'Coin name is required'] },
      coinQuantity: {
        type: String,
        require: [true, 'Coin quantity is required'],
      },
      price: { type: Number },
    },

    historyPayment: {
      name: { type: String, require: [true, 'Name payment is required'] },
      paymentType: {
        type: String,
        require: [true, 'Payment type is required'],
      },
      bankName: { type: String, require: [true, 'Bank name is required'] },
      accountNumber: {
        type: String,
        require: [true, 'Account number is required'],
      },
    },

    name: {
      type: String,
      require: [true, 'Name is required'],
      maxLength: [225, 'Name must between 3 - 225 character'],
      minLength: [3, 'Name must between 3 - 225 character'],
    },

    accountUser: {
      type: String,
      require: [true, 'Account name is required'],
      maxLength: [225, 'Name must between 3 - 225 character'],
      minLength: [3, 'Name must between 3 - 225 character'],
    },

    tax: {
      type: Number,
      default: 0,
    },

    value: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ['pending', 'success', 'failed'],
      default: 'pending',
    },

    player: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Player',
    },

    historyUser: {
      name: { type: String, require: [true, 'Name player is required'] },
      phoneNumber: {
        type: Number,
        require: [true, 'Phone number is required'],
        maxLength: [13, 'Phone number between 3 - 13 character'],
        minLength: [3, 'Phone number must between 3 - 13 character'],
      },
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Transaction', transactionSchema);
