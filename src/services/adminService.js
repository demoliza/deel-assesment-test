const { Op } = require('sequelize');

const fetchBestProfession = async (req) => {
    const sequelize = req.app.get('sequelize');
    const { startDate, endDate } = req.query;
    const { Job, Contract, Profile } = req.app.get('models');
  
    const topProfession = await Profile.findAll({
    attributes: ['profession', [sequelize.fn('SUM', sequelize.col('price')), 'totalEarnings']],
    include: [
      {
        model: Contract,
        attributes: [],
        as: 'Contractor',
        required: true,
        include: [
            {
            attributes: [],
            model: Job,
            required: true,
            where: {
              paid: true,
              paymentDate: {
                  [Op.gte]: startDate,
                  [Op.lte]: endDate
              },
            },
          },
        ],
      },
    ],
    where: {
      type: 'contractor',
    },
    group: ['profession'],
    order: [[sequelize.col('totalEarnings'), 'DESC']],
    limit: 1,
    subQuery: false,
    });

  return topProfession[0];
};

const fetchBestClient = async (req) => {
  const sequelize = req.app.get('sequelize');
  const { startDate, endDate, limit } = req.query;
  const { Job, Contract, Profile } = req.app.get('models');

  const topClient = await Profile.findAll({
  attributes: [[sequelize.literal("firstName || ' ' || lastName"), 'fullName'], [sequelize.fn('SUM', sequelize.col('price')), 'paid']],
  include: [
    {
      model: Contract,
      attributes: [],
      as: 'Contractor',
      required: true,
      include: [
          {
          attributes: [],
          model: Job,
          required: true,
          where: {
            paid: true,
            paymentDate: {
                [Op.gte]: startDate,
                [Op.lte]: endDate
            },
          },
        },
      ],
    },
  ],
  where: {
    type: 'client',
  },
  group: ['Profile.id'],
  order: [[sequelize.col('paid'), 'DESC']],
  limit: Number(limit) || 2,
  subQuery: false,
  });

return topClient;
};

module.exports = {fetchBestProfession, fetchBestClient};