const ProfileService = require('../services/profileService');

const deposit = async (req, res) => {
  try {
    await ProfileService.deposit(req);

    res.status(200).json({message:"Deposit Successful"});

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { deposit };