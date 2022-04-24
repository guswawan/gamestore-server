const Category = require('./model');

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = { message: alertMessage, status: alertStatus };
      const categories = await Category.find();

      res.render('admin/category/view_category', {
        categories,
        alert,
        name: req.session.user.name,
        title: 'Category | Dashboard Gamestore',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/category');
    }
  },

  viewCreate: async (req, res) => {
    try {
      res.render('admin/category/create', {
        name: req.session.user.name,
        title: 'Category | Dashboard Gamestore',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/category');
    }
  },

  actionCreate: async (req, res) => {
    try {
      const { name } = req.body;

      let category = await Category({ name });
      await category.save();

      req.flash('alertMessage', 'Data added successfully');
      req.flash('alertStatus', 'success');
      res.redirect('/category');
    } catch (err) {
      req.flash('alertMessage', `Data failed to add: ${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/category');
    }
  },

  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;

      const category = await Category.findOne({ _id: id });
      res.render('admin/category/edit', {
        category,
        name: req.session.user.name,
        title: 'Category | Dashboard Gamestore',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/category');
    }
  },

  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;

      await Category.findOneAndUpdate({ _id: id }, { name });

      req.flash('alertMessage', 'Data updated successfully');
      req.flash('alertStatus', 'success');
      res.redirect('/category');
    } catch (err) {
      req.flash('alertMessage', `Data failed to update: ${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/category');
    }
  },

  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;

      await Category.findOneAndRemove({ _id: id });

      req.flash('alertMessage', 'Data deleted successfully');
      req.flash('alertStatus', 'success');
      res.redirect('/category');
    } catch (err) {
      req.flash('alertMessage', `Data failed to delete: ${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/category');
    }
  },
};
