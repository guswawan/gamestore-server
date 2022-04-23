const Payment = require('./model');
const Bank = require('../bank/model');

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = { message: alertMessage, status: alertStatus };
      const payment = await Payment.find().populate('banks');

      res.render('admin/payment/view_payment', { payment, alert });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/payment');
    }
  },

  viewCreate: async (req, res) => {
    try {
      const banks = await Bank.find();
      res.render('admin/payment/create', {
        banks,
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/payment');
    }
  },

  actionCreate: async (req, res) => {
    try {
      const { nameType, banks } = req.body;

      let payment = await Payment({ nameType, banks });
      await payment.save();

      req.flash('alertMessage', 'Data added successfully');
      req.flash('alertStatus', 'success');
      res.redirect('/payment');
    } catch (err) {
      req.flash('alertMessage', `Data failed to add: ${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/payment');
    }
  },

  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;

      const payment = await Payment.findOne({ _id: id }).populate('banks');
      const banks = await Bank.find();

      res.render('admin/payment/edit', {
        payment,
        banks,
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/payment');
    }
  },

  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { nameType, banks } = req.body;

      await Payment.findOneAndUpdate({ _id: id }, { nameType, banks });

      req.flash('alertMessage', 'Data updated successfully');
      req.flash('alertStatus', 'success');
      res.redirect('/payment');
    } catch (err) {
      req.flash('alertMessage', `Data failed to update: ${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/payment');
    }
  },

  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;

      await Payment.findOneAndRemove({ _id: id });

      req.flash('alertMessage', 'Data deleted successfully');
      req.flash('alertStatus', 'success');
      res.redirect('/payment');
    } catch (err) {
      req.flash('alertMessage', `Data failed to delete: ${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/payment');
    }
  },
};
