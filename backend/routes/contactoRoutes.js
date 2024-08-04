const express = require('express');
const Contacto = require('../models/contacto');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const nuevoContacto = await Contacto.create(req.body);
    res.status(201).json({
      status: 'success',
      data: nuevoContacto,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
});

module.exports = router;
