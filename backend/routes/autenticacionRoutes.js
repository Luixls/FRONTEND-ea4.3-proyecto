const express = require('express');
const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Registro de usuarios
router.post('/register', async (req, res) => {
  try {
    const nuevoUsuario = await Usuario.create(req.body);
    const token = jwt.sign({ id: nuevoUsuario._id }, process.env.JWT_SECRET, {
      expiresIn: '90d'
    });
    res.status(201).json({
      status: 'success',
      token,
      data: { usuario: nuevoUsuario }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
});

// Login de usuarios
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ status: 'fail', message: 'Por favor ingrese email y contraseña' });
  }

  const usuario = await Usuario.findOne({ email }).select('+password');

  if (!usuario || !(await usuario.correctPassword(password, usuario.password))) {
    return res.status(401).json({ status: 'fail', message: 'Email o contraseña incorrectos' });
  }

  const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, {
    expiresIn: '90d'
  });

  res.status(200).json({
    status: 'success',
    token
  });
});

module.exports = router;
