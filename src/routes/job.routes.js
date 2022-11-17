const express = require('express');

const {getUserUnpaidJobs, payContractor} = require('../controllers/jobController');
const { getProfile } = require('../middleware/getProfile');

const jobRoutes = express.Router();

jobRoutes.get('/unpaid', getProfile, getUserUnpaidJobs);
jobRoutes.post('/:job_id/pay', getProfile, payContractor);

module.exports = jobRoutes;