const { User } = require('../models/user');
const { verifyToken } = require('../helpers/jwt');

function authentication(req, res, next) {
    try {
        const token = req.get('token');
        const payload = verifyToken(token);

        User.findOne({ where: { name: payload.name } })
            .then(foundUser => {
                if (!foundUser) {
                    return res.status(401).send("User does not exist");
                }

                res.locals.user = foundUser;
                console.log(payload);

                next(); 
            })
            .catch(err => {
                return res.status(500).send("Error when searching for user");
            });
    } catch (e) {
        return res.status(401).send("Error when validating token");
    }
}

function sendUserData(req, res) {
    const { id, name, email, role, address, phonenumber } = res.locals.user;
    return res.status(200).send({ id, name, email, role, address, phonenumber });
}

module.exports = { authentication, sendUserData };
