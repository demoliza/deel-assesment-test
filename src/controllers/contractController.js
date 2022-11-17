const ContractService = require('../services/contractService');

const getContractById = async (req, res) => {
  try {
    const contract = await ContractService.getContractById(req);
    if (!contract) {
      res.sendStatus(404);
    } else {
      res.status(200).json(contract);
    }
  } catch (error) {
    res
      .status(400)
      .json({ error });
  }
};

const getUserContracts = async (req, res) => {
  try {
    const contracts = await ContractService.getUserContracts(req);

    if (!contracts) res.sendStatus(404).json({"message":"No Contracts Found"});

    res.status(200).json(contracts);
    
  } catch (error) {
    res.status(400).json({ message:"Error Occurred", error });
  }
};

module.exports = {
  getContractById,
  getUserContracts
};
