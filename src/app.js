const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const {sequelize} = require('./model')
app.set('sequelize', sequelize);
app.set('models', sequelize.models);

const jobRoutes = require( './routes/job.routes');
const profileRoutes = require( './routes/profile.routes');
const adminRoutes = require( './routes/admin.routes');
const contractRoutes = require('./routes/contract.routes');
app.use('/contracts', contractRoutes);
app.use('/jobs', jobRoutes);
app.use('/balances', profileRoutes);
app.use('/admin', adminRoutes);

module.exports = app;
