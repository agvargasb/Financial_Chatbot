const config = require("../config/auth.config");
require("dotenv").config();
const transport = require("../email/transport");
const { user } = require("../database/models");
const jwt = require("jsonwebtoken");
const { hashSync, compareSync } = require("bcryptjs");

const auth = {
  signin: async (req, res) => {
  
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ message: "User and password required" });

    const foundUser = await user.findOne({
      where: {
        email: req.body.email,
      },
      include:{all:true}

    });

    if (!foundUser) {
      return res.status(401).send({ message: "User Not found." });
    }

    const isActive = foundUser.isActivated;
  
    if (foundUser && isActive || foundUser.email == "admin@fainancial.com") {
      const match = compareSync(req.body.password, foundUser.password);

      if (!match) {
        return res
          .status(401)
          .send({ message: "Usuario o contraseña invalidas" });
      } else {

        const accessToken = jwt.sign(
          {
            UserInfo: {
              email: foundUser.email
            },
          },
          config.secret,
          {
            expiresIn: "10m",
          }
        );
        const refreshToken = jwt.sign(
          {
            email: foundUser.email
          },
          config.refresh,
          {
            expiresIn: "1h",
          }
        );

        //Saving regreshtoken with current user
        foundUser.update({ refreshToken: refreshToken });
        // Creates Secure Cookie with refresh token
        
        res.cookie("jwt", refreshToken, {
          httpOnly: true,
          SameSite: false,
          maxAge: 24 * 60 * 60 * 1000,
        });
        // Send authorization roles and access token to user
        res.status(200).json({
          user_id: foundUser.id,
          accessToken: accessToken,
        });
      }
    } else {
      // si encuentro el user pero no está activo
      return res.status(403).send({
        message: "Account is not activated",
      });
    }
  },

  signup: async (req, res) => {
    //Primero verifico que se haya enviado al menos username, email, y pass
    const { password, email } = req.body;
    if (!password || !email) {
      return res
        .status(400)
        .json({ message: "email & password required" });
    }
    // Me fijo si el email ya está registrado con middleware CheckDuplicate
    const duplicateUser = await user.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (duplicateUser && email === duplicateUser.email) {
      res.status(409).send({
        message:
          "There was an error creating your account. Please try again with a different email",
      }) 
      return;
    };
    
    //Si al menos tengo email -no repetido - y pass entonces lo regitro
    try {
      // creo token de activacion de la cuenta
      let activateToken = jwt.sign({ user: req.body.email }, config.activate, {
        expiresIn: config.expires, // 1 hours
      });
      // hasheo la contraseña para guardarla
      const dbPassword = hashSync(password, 10);
    

      //creo el usuario en base de datos y le envio por mail token de activacion y link
      let newUser = await user
        .create({
          email: req.body.email,
          password: dbPassword,
          activateToken: activateToken,
          isActivated: false,
        })
        .then((user) => {
          //creo el mensaje
          const message = {
            from: process.env.USER_NAME_GMAIL,
            to: user.email,
            replyTo: process.env.USER_NAME_GMAIL,
            subject: "Verify Your fAInancial Account - No Reply Needed",
            text: `
                Greetings from fAinancial!\n\n
                To verify your account, simply click here:\n
                http://${process.env.DOMAIN}/activate?activateToken=${encodeURIComponent(user.activateToken)}&email=${user.email}\n\n
                Thank you for choosing fAinancial!
            `,
        };
          //mando el email
          transport.sendMail(message, function (err, info) {
            if (err) {
              console.log(err);
            } else {
              console.log(info);
            }
          });

          res.json({
            user: user,
            activateToken: activateToken,
          });
        });

      if (newUser) {
        return res.status(200).json(newUser);
      } else {
        return res.status(404).json(newUser);
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

module.exports = auth;
