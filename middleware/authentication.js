const JWT = require('jsonwebtoken');
const auth = (req, res, next) => {
    try {
        const { token } = req.headers;
        req.user = JWT.verify(token, process.env.USER_SEXRET_KEY);
        next();
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            type: 'unauthorized',
            massage: 'invalid token'
        });
    }
}

const adminAuth = (req, res, next) => {
    try {
        const { token } = req.headers;
        req.user = JWT.verify(token, process.env.ADMIN_SEXRET_KEY);
        next();
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            type: 'unauthorized',
            massage: 'invalid token'
        });
    }
}

module.exports = { auth, adminAuth }