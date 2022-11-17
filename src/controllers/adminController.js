const AdminService = require('../services/adminService');

const fetchBestProfession = async (req, res) => {
  try {
    const bestProfession = await AdminService.fetchBestProfession(req);
    if (!bestProfession) res.status(404).json({ message: 'Unable to fetch best profession' });
      res.status(200).json(bestProfession);
  } catch (error) {
    res.status(400).json({ message: error?.message });
  }
};

const fetchBestClient = async (req, res) => {
    try {
      const bestClient = await AdminService.fetchBestClient(req);
      if (!bestClient) res.status(404).json({ message: 'Unable to fetch best client' });
        res.status(200).json(bestClient);
    } catch (error) {
      res.status(400).json({ message: error?.message });
    }
  };

module.exports = {fetchBestProfession, fetchBestClient};