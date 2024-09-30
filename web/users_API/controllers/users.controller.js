const User = require("../models/user");

exports.getUser = async (req, res) => {

  const userId = req.userId; // obtained from authJwt.js

  await User.findByPk(userId).then((user) => {
    res.status(200).send(user);
  });
};
