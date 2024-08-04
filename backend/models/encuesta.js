const mongoose = require('mongoose');

const preguntaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  }
});

const encuestaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  preguntas: [preguntaSchema],
  respuestas: [
    {
      pregunta: String,
      respuesta: String
    }
  ]
});

const Encuesta = mongoose.model('Encuesta', encuestaSchema);

module.exports = Encuesta;
