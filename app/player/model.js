const mongoose = require('mongoose');

let playerSchema = mongoose.Schema(
  {
    email: {
      type: String,
      require: [true, 'Email is required'],
    },
    name: {
      type: String,
      require: [true, 'Name is required'],
    },
    username: {
      type: String,
      require: [true, 'Username is required'],
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
    avatar: {
      type: String,
    },
    fileName: {
      type: String,
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
    favorite: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Player', playerSchema);
