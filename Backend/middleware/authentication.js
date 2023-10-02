const { User } = require('../models');
const { verifyToken } = require('../helpers/jwt');

function authentication(req, res, next) {
    try {
        const token = req.get('accessToken');
        const payload = verifyToken(token);

        User.findOne({ where: { name: payload.name } })
            .then(foundUser => {
                if (!foundUser) {
                    return res.status(401).send("User does not exist");
                }

                res.locals.user = foundUser;
                console.log(payload);

                if (foundUser.role !== 'admin') {
                    return res.status(403).send("Access denied. Admin role required.");
                }

                next(); 
            })
            .catch(err => {
                return res.status(500).send("Error when searching for user");
            });
    } catch (e) {
        return res.status(401).send("Error when validating token");
    }
}

module.exports = { authentication };
