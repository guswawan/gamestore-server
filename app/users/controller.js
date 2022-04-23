const User = require('./model');
const bcrypt = require('bcryptjs');

module.exports = {
  viewSignin: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = { message: alertMessage, status: alertStatus };
      if (req.session.user === null || req.session.user === undefined) {
        res.render('admin/users/view_signin', { alert });
      } else {
        res.redirect('/dashboard');
      }
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/');
    }
  },

  actionSignin: async (req, res) => {
    try {
      const { email, password } = req.body;
      const check = await User.findOne({ email: email });

      if (check) {
        if (check.status === 'Y') {
          const checkPassword = await bcrypt.compare(password, check.password);
          if (checkPassword) {
            req.session.user = {
              id: check._id,
              email: check.email,
              name: check.name,
              status: check.status,
            };
            res.redirect('/dashboard');
          } else {
            req.flash('alertMessage', `password tidak match`);
            req.flash('alertStatus', 'danger');
            res.redirect('/');
          }
        } else {
          req.flash('alertMessage', `status user tidak aktif`);
          req.flash('alertStatus', 'danger');
          res.redirect('/');
        }
      } else {
        req.flash('alertMessage', `user tidak terdaftar`);
        req.flash('alertStatus', 'danger');
        res.redirect('/');
      }
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/');
    }
  },
};
