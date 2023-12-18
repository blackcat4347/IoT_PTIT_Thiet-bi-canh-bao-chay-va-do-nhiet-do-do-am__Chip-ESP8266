const Account = require('../../models/account.model')

// [GET] /admin/login
module.exports.login = (req,res) => {
  res.render('admin/login.pug');
}
//[POST] /admin/login
module.exports.authen = async (req, res) => {
  try {
      const account = await Account.findOne({ username: req.body.username });
      console.log(account);
      if(account){
         res.render('admin/dashboard');
      }
  } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
  }
};


