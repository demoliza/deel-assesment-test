const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const {sequelize} = require('./model')
app.set('sequelize', sequelize);
app.set('models', sequelize.models);

const jobRoutes = require( './routes/jobRoutes');
const profileRoutes = require( './routes/profileRoutes');
const adminRoutes = require( './routes/adminRoutes');
const contractRoutes = require('./routes/contractRoutes');
app.use('/contracts', contractRoutes);
app.use('/jobs', jobRoutes);
app.use('/balances', profileRoutes);
app.use('/admin', adminRoutes);

module.exports = app;
