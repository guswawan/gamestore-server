const Category = require('../category/model');
const Player = require('../player/model');
const Transaction = require('../transaction/model');
const Voucher = require('../voucher/model');

module.exports = {
  index: async (req, res) => {
    try {
      const category = await Category.countDocuments();
      const player = await Player.countDocuments();
      const transaction = await Transaction.countDocuments();
      const voucher = await Voucher.countDocuments();

      res.render('admin/dashboard/view_dashboard', {
        name: req.session.user.name,
        title: 'Home | Dashboard Gamestore',
        count: {
          category,
          player,
          transaction,
          voucher,
        },
      });
    } catch (err) {
      console.log(err);
    }
  },
};
