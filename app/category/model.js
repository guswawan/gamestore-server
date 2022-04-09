const mongoose = require('mongoose');

let categorySchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Category name is required'],
  },
});

module.exports = mongoose.model('Category', categorySchema);
