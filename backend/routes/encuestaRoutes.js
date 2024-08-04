const express = require('express');
const { proteger } = require('../middleware/autenticacion');
const Encuesta = require('../models/encuesta');
const router = express.Router();

// Crear encuesta
router.post('/', proteger, async (req, res) => {
  try {
    const encuesta = await Encuesta.create(req.body);
    res.status(201).json(encuesta);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Obtener todas las encuestas
router.get('/', proteger, async (req, res) => {
  try {
    const encuestas = await Encuesta.find();
    res.json(encuestas);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Obtener encuesta por ID
router.get('/:id', proteger, async (req, res) => {
  try {
    const encuesta = await Encuesta.findById(req.params.id);
    if (!encuesta) {
      return res.status(404).json({ message: 'Encuesta no encontrada' });
    }
    res.json(encuesta);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Responder encuesta
router.post('/:id/responder', proteger, async (req, res) => {
  try {
    const encuesta = await Encuesta.findById(req.params.id);
    if (!encuesta) {
      return res.status(404).json({ message: 'Encuesta no encontrada' });
    }
    encuesta.respuestas.push(...req.body.respuestas);
    await encuesta.save();
    res.status(201).json({ message: 'Respuestas guardadas' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
