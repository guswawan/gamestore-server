const Nominal = require('./model');

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = { message: alertMessage, status: alertStatus };
      const nominal = await Nominal.find();

      res.render('admin/nominal/view_nominal', { nominal, alert });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/nominal');
    }
  },

  viewCreate: async (req, res) => {
    try {
      res.render('admin/nominal/create');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/nominal');
    }
  },

  actionCreate: async (req, res) => {
    try {
      const { coinName, price, coinQuantity } = req.body;

      let nominal = await Nominal({ coinName, price, coinQuantity });
      await nominal.save();

      req.flash('alertMessage', 'Data added successfully');
      req.flash('alertStatus', 'success');
      res.redirect('/nominal');
    } catch (err) {
      req.flash('alertMessage', `Data failed to add: ${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/nominal');
    }
  },

  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;

      const nominal = await Nominal.findOne({ _id: id });
      res.render('admin/nominal/edit', { nominal });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/nominal');
    }
  },

  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { coinName, coinQuantity, price } = req.body;

      await Nominal.findOneAndUpdate(
        { _id: id },
        { coinName, coinQuantity, price }
      );

      req.flash('alertMessage', 'Data updated successfully');
      req.flash('alertStatus', 'success');
      res.redirect('/nominal');
    } catch (err) {
      req.flash('alertMessage', `Data failed to update: ${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/nominal');
    }
  },

  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;

      await Nominal.findOneAndRemove({ _id: id });

      req.flash('alertMessage', 'Data deleted successfully');
      req.flash('alertStatus', 'success');
      res.redirect('/nominal');
    } catch (err) {
      req.flash('alertMessage', `Data failed to delete: ${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/nominal');
    }
  },
};
