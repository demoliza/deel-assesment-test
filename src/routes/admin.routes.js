const express = require('express');

const { fetchBestProfession, fetchBestClient } = require('../controllers/adminController');

const adminRoutes = express.Router();

adminRoutes.get('/best-profession', fetchBestProfession);
adminRoutes.get('/best-clients', fetchBestClient);

module.exports = adminRoutes;