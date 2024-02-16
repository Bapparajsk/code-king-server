const JWT = require('jsonwebtoken');

const createToken = () => {
    const payload = {
        _id: 'bapmendt19283',
        user: 'admin'
    }
    return JWT.sign(payload, process.env.ADMIN_SEXRET_KEY);
}

module.exports = { createToken }