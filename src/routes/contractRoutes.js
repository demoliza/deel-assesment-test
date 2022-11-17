const express = require('express');

const {getContractById, getUserContracts} = require('../controllers/contractController');
const { getProfile } = require('../middleware/getProfile');

const contractRoutes = express.Router();

contractRoutes.get('/:id', getProfile, getContractById);
contractRoutes.get('/', getProfile, getUserContracts);

module.exports = contractRoutes;