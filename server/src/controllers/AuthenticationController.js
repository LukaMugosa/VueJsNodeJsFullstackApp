const {User} = require('../models');
const {pass} = require("../../../client/test/e2e/custom-assertions/elementCount");
const jwt = require('jsonwebtoken');
const config = require('../config/config');

function jwtSignUser (user){
    const ONE_WEAK = 60 * 60 * 24 * 7;
    return jwt.sign(user, config.authentication.jwtSecret, {
        expiresIn: ONE_WEAK,
    })
}

module.exports = {
    async register(req, res) {
        try {
            const user = await User.create(req.body);
            res.send(user.toJSON());
        }catch (error) {
            // email already exists
            res.status(400)
                .send({
                    error: 'This email account is already in use.'
                })
        }
    },
    async login (req, res) {
        try {
            const {email, password} = req.body;
            const user = await User.findOne({
                where : {
                  email: email
                }
            });
            if(!user){
                res.status(401).send({
                    error: 'The login information was incorrect!'
                })
            }
            console.log("checking pass is valid");
            const isPasswordValid = await user.comparePassword(password);
            console.log("Is pass valid: ", isPasswordValid);

            if(!isPasswordValid){
                res.status(401).send({
                    error: 'The login information was incorrect!'
                })
            }

            const userJson = user.toJSON();
            res.send({
                user: userJson,
                token: jwtSignUser(userJson)
            });
        }catch (error) {
            // email already exists
            res.status(500)
                .send({
                    error: 'An error has occurred, trying to login!'
                })
        }
    }
}