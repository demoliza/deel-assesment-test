const deposit = async (req) => {
    let response = {};
    const { Job, Contract, Profile } = req.app.get('models');
    const sequelize = req.app.get('sequelize');

    const clientId = req.params.userId;
    const amountToDeposit = req.body.amount;
    if (!amountToDeposit) throw new Error('Enter valid deposit amount');
    
    try {
        const t = await sequelize.transaction(async (t) => { 

        const clientProfile = await Profile.findByPk(clientId);
        if (!clientProfile) throw new Error('client not found');
    
        const totalToPay = await Job.findAll(
        {
            attributes: {
                include: [[sequelize.fn('SUM', sequelize.col('price')), 'totalContractCost']],
            },
            include: [
                {
                attributes: [],
                model: Contract,
                required: true,
                where: {
                    ClientId: clientId,
                    status: 'in_progress',
                },
                },
            ],
            where: {
                paid: null,
            },
        },
        { transaction: t },
        );
    
            const { totalContractCost } = totalToPay[0].dataValues;
            if (!totalContractCost) throw new Error('No outstanding payments');
    
            const maxDeposit = totalContractCost * 0.25;

            if (amountToDeposit > maxDeposit) {
                throw new Error('You cannot deposit more than 25% of client total contract cost');
        
            } else {
                await clientProfile.increment({ balance: amountToDeposit }, { transaction: t });
        
                clientProfile.balance += amountToDeposit;
                response = clientProfile;
            }
        });
       
      return response;
  
    } catch (error) {
        throw new Error(error?.message);
        
    }
  };
  
  module.exports = {deposit};