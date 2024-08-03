const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/test', require('./routes/testRoutes'));
app.use('/api/auth', require('./routes/autenticacionRoutes'));

module.exports = app;
