const express = require('express');
const Test = require('../models/testModel');

const router = express.Router();

router.get('/crear', async (req, res) => {
  try {
    const nuevoTest = await Test.create({ nombre: 'Prueba', edad: 25 });
    res.status(201).json({
      status: 'success',
      data: nuevoTest
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
});

module.exports = router;
