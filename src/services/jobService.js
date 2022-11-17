const { Op } = require('sequelize');

const getUnpaidJobs = async (req) => {
  const { Job, Contract } = req.app.get('models');
  const profileId = req.profile.id;

  const unpaidJobs = await Job.findAll({
    include: [
      {
        attributes: [],
        model: Contract,
        required: true,
        where: {
          [Op.or]: [{ ContractorId: profileId }, { ClientId: profileId }],
          status: {
            [Op.eq]: 'in_progress',
          },
        },
      },
    ],
    where: {
      [Op.or]: [
        { paid: false },
        { paid: null },
      ],
    },
  });

  return unpaidJobs;
};

const payContractor = async (req) => {
    const sequelize = req.app.get('sequelize');
    const jobId = req.params.job_id;
    const { id, balance, type } = req.profile;
    const { Contract, Job, Profile } = req.app.get('models');

    if(type != 'client') throw new Error('User not a client');

    const job = await Job.findOne({
        where: { id: jobId },
        include: [
        {
            model: Contract,
            where: { status: 'in_progress', ClientId: id },
        },
        ],
    });
    
    if (!job) throw new Error('Job not found');

    const contractorId = job.Contract.ContractorId;
    const amountToPay = job.price;

    if (balance >= amountToPay) {
    try {
    const t = await sequelize.transaction(async (t) => {
        
            Profile.update(
                { balance: sequelize.literal(`balance - ${amountToPay}`) },
                { where: { id } },
                { transaction: t },
            );

            Profile.update(
                { balance: sequelize.literal(`balance + ${amountToPay}`) },
                { where: { id: contractorId } },
                { transaction: t },
            );

            Job.update(
                { paid: 1, paymentDate: new Date() },
                { where: { id: jobId } },
                { transaction: t },
            );

            return job;
        })

    } catch (error) {
        console.log(error)
        throw error
    }
    }
};

module.exports = { getUnpaidJobs, payContractor};