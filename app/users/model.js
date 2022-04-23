const mongoose = require('mongoose');

let userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      require: [true, 'Email is required'],
    },
    name: {
      type: String,
      require: [true, 'Name is required'],
    },
    password: {
      type: String,
      require: [true, 'Password is required'],
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'admin',
    },
    phoneNumber: {
      type: String,
      require: [true, 'Phone number  is required'],
    },
    status: {
      type: String,
      enum: ['Y', 'N'],
      default: 'Y',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
