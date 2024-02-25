const JWT = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

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

const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                // Reject the promise with the error
                reject(err);
                return;
            }

            // Hash the password using the salt
            bcrypt.hash(password, salt, (err, hashedPassword) => {
                if (err) {
                    // Reject the promise with the error
                    reject(err);
                    return;
                }

                // Resolve the promise with the hashed password
                resolve(hashedPassword);
            });
        });
    });
};

const comparePassword = async (plainPassword, hashedPassword) => {
    try {
        return await bcrypt.compare(plainPassword, hashedPassword); // Return true if passwords match, false otherwise
    } catch (error) {
        // Handle error if bcrypt.compare fails
        console.error('Error comparing passwords:', error);
        return false; // Return false in case of error
    }
};

module.exports = { auth, adminAuth, hashPassword, comparePassword }