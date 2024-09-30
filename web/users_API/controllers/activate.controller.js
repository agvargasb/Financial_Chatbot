const { user } = require("../database/models");


const activateAccount = {
    activateAcc: async (req, res) => {
        if (req.body && req.body.email && req.body.activateToken) {
            const userToActivate = await user.findOne({
                where: {
                    email: req.body.email,
                }
            })
            
            const matchActivate = req.body.activateToken == userToActivate.activateToken
            if (matchActivate && !userToActivate.activated) {
                try {
                    let activation = await user.update(
                        { isActivated: true },
                        {
                            where: {
                                email: req.body.email,
                            }
                        })
                    return res.status(200).json("cuenta activada")
                } catch (error) { return res.status(500).json(error) }
            } else if (!matchActivate) {
                return res.status(403).json({ message: "The activation token is invalid. Please try registering again with a different email address." })
            } else {
                return res.status(404).json({ message: "Your account is active." })
            }
        }
        
        else { return res.status(400).json({ message: "email required" }) };
  
        
    },
};

module.exports = activateAccount;