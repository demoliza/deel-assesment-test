const JobService = require('../services/jobService');

const getUserUnpaidJobs = async (req, res) => {
  try {
    const unPaidJobs = await JobService.getUnpaidJobs(req);
    if (!unPaidJobs) res.sendStatus(404);
    res.status(200).json(unPaidJobs);
  } catch (error) {
    res.status(400).json({ error });
  }
};

const payContractor = async (req, res) => {
  try {
     await JobService.payContractor(req);
    
    res.status(200).json({ message: "Job paid for successfully" });

  } catch (error) {
      //console.log(error)
    res.status(400).json({ message: error?.message });
  }
};

module.exports = {
    getUserUnpaidJobs,
    payContractor,
};