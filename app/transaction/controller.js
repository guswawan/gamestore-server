const Transaction = require('./model');

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = { message: alertMessage, status: alertStatus };
      const transaction = await Transaction.find();

      res.render('admin/transaction/view_transaction', {
        transaction,
        alert,
        name: req.session.user.name,
        title: 'Transaction | Dashboard Gamestore',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/transaction');
    }
  },

  actionStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.query;

      const modStatus = await Transaction.findByIdAndUpdate(
        { _id: id },
        { status }
      );

      req.flash(
        'alertMessage',
        `Transaction ${status === 'failed' ? 'rejected' : 'successfully'}`
      );
      req.flash('alertStatus', 'info');
      res.redirect('/transaction');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/transaction');
    }
  },
};
