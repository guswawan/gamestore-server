module.exports = {
  index: async (req, res) => {
    try {
      res.render('index', {
        name: req.session.user.name,
        title: 'Home | Dashboard Gamestore',
      });
    } catch (err) {
      console.log(err);
    }
  },
};
