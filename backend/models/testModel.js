const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  edad: {
    type: Number,
    required: true
  }
});

const Test = mongoose.model('Test', testSchema);

module.exports = Test;
