const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

exports.proteger = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ status: 'fail', message: 'No estás autorizado para acceder a esta ruta' });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const usuario = await Usuario.findById(decoded.id);

  if (!usuario) {
    return res.status(401).json({ status: 'fail', message: 'El usuario ya no existe' });
  }

  req.usuario = usuario;
  next();
};
