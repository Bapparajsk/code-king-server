const JWT = require('jsonwebtoken');

const createToken = () => {
    const payload = {
        _id: 'bapmendt19283',
        user: 'admin'
    }
    return JWT.sign(payload, process.env.ADMIN_SEXRET_KEY, { expiresIn: "4h"});
}

const createTokenInUser = (user) => {
    return JWT.sign(user, process.env.USER_SEXRET_KEY, { expiresIn: "30d" });
}


/**
 *  @param {{userName: String, email: String, password: String}} user
 *  @return {String}
 * */

const createSessionToken = (user) => {
    return JWT.sign(user, process.env.USER_SEXRET_KEY, { expiresIn: "30m" })
}




module.exports = { createToken, createTokenInUser, createSessionToken }
