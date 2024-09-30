const { user } = require("../database/models");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

const handleRefreshToken = async (req, res, next) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  const foundUser = await user.findOne({
      where: {
        refreshToken: refreshToken,
      },
      include:{all:true}

    });
  if (!foundUser) return res.sendStatus(403); //Forbidden

  //evaluate jwt
  jwt.verify(refreshToken, config.refresh, (err, decoded) => {
    if (err || foundUser.email !== decoded.email) return res.sendStatus(403);
    
    const id = foundUser.id;
    const email = foundUser.email;
    const accessToken = jwt.sign(
      {
        UserInfo: {
          email:email,
          id: id,
        },
      },
      config.secret,
      { expiresIn: "50s" }
    );
    res.json({ accessToken, email, id });
  });
};
module.exports = { handleRefreshToken };
