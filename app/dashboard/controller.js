module.exports = {
  index: async (req, res) => {
    try {
      res.render('admin/dashboard/view_dashboard', {
        name: req.session.user.name,
        title: 'Home | Dashboard Gamestore',
      });
    } catch (err) {
      console.log(err);
    }
  },
};
