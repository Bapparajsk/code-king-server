const JWT = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

/**
 *  @param {Object} req
 *  @param {Object} res
 *  @param {Function} next
 * */

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

/**
 *  @param {Object} req
 *  @param {Object} res
 *  @param {Function} next
 * */

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

/**
 *  @param {String} password
 *  @return {Promise}
 * */

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

/**
 *  @param {String} plainPassword
 *  @param {String} hashedPassword
 *  @return {Promise}
 * */

const comparePassword = async (plainPassword, hashedPassword) => {
    try {
        return await bcrypt.compare(plainPassword, hashedPassword); // Return true if passwords match, false otherwise
    } catch (error) {
        // Handle error if bcrypt.compare fails
        console.error('Error comparing passwords:', error);
        return false; // Return false in case of error
    }
};


/** @type {Set<String>} tokenBlacklist */
const tokenBlacklist = new Set();

/**
 *  @param {Object} req
 *  @param {Object} res
 *  @param {Function} next
 * */

const verifySecessionToken = (req, res, next) => {
    try {
        const { token } = req.headers;

        if (tokenBlacklist.has(token)) {
            return res.status(401).json({
                success: false,
                massage: 'user already verified'
            });
        }
        req.user = JWT.verify(token, process.env.USER_SEXRET_KEY);

        setTimeout(() => {
            tokenBlacklist.delete(token);
        }, 1_800_000);

        next();
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            success: false,
            massage: 'invalid token'
        });
    }
}

/**
 *  @param {String} otp
 *  @param {String} userOtp
 *  @param {String} token
 *  @return {boolean}
 * */

const verifyOTP = (otp, userOtp, token) => {
    if (otp !== userOtp)  return false;

    tokenBlacklist.add(token);
    setTimeout(() => {
        tokenBlacklist.delete(token);
    },1_800_000);
    return true;
}


module.exports = { auth, adminAuth, hashPassword, comparePassword, verifySecessionToken, verifyOTP }
