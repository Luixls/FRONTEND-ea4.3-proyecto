const mongoose = require('mongoose');

const contactoSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  numero: {
    type: Number,
    required: true,
  },
  fecha: {
    type: Date,
    required: true,
  },
  telefono: {
    type: String,
    required: true,
  },
  comentarios: {
    type: String,
    required: true,
  },
});

const Contacto = mongoose.model('Contacto', contactoSchema);

module.exports = Contacto;
