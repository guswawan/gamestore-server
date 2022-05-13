const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const HASH_AROUND = 10;

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

playerSchema.path('email').validate(
  async function (value) {
    try {
      const count = await this.model('Player').countDocuments({ email: value });
      return !count;
    } catch (err) {
      throw err;
    }
  },
  (attr) => `${attr.value} already registered.`
);

playerSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, HASH_AROUND);
  next();
});

module.exports = mongoose.model('Player', playerSchema);
