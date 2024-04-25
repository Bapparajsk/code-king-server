const router = require('express').Router();
const { hashPassword, comparePassword } = require("../middleware/authentication");
const { isValidEmail } = require('../middleware/function');
const userModel = require('../model/usersSign.schema');
const userDetailsModel = require('../model/userDetails.schema');
const { createTokenInUser } = require('../middleware/token');

/*  /api/user/sign-up  --> this route new user create */

router.post('/sign-up', async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        if (!userName || !email || !password || !isValidEmail(email)) {
            return res.status(401).json({
                type: 'error',
                message: 'inputs are not valid'
            });
        }

        if (await userModel.findOne({ email })) {
            return res.status(401).json({
                type: 'error',
                message: 'Email already exists'
            });
        }

        const hash_password = await hashPassword(password);

        const newUser = await userModel.create({
            user_name: userName,
            email: email,
            password: hash_password
        });

        const newUserDetails = await userDetailsModel.create({
            user_ID: newUser._id,
            user_name: newUser.user_name,
            email: newUser.email,
            problems_status: {
                Solved: new Set(),
                Attempted: new Set(),
            }
        });

        const userToken = createTokenInUser({ userName, _id: newUser._id });

        return res.status(201).json({
            type: 'successful',
            message: 'new user created',
            token: userToken,
            userDetail: newUserDetails,
            problemsStatus: newUserDetails.problems_status
        });

    } catch (error) {
        console.log('internal server Error :- ', error);
        return res.status(500).json({
            type: 'error',
            message: 'internal server Error'
        });
    }
});

/*  /api/user/sign-in  --> this route sign-in user */

router.post('/sign-in', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({email});
        if (!user) {
            console.log('sss')
            return res.status(401).json({
                type: 'error',
                message: 'unauthorized this user'
            });
        }

        const passwordIsMach = await comparePassword(password, user.password);
        if (!passwordIsMach) {
            return res.status(401).json({
                type: 'error',
                message: 'unauthorized this user'
            });
        }

        const userToken = createTokenInUser({ userName:user.user_name , _id: user._id });
        const useDetails = await userDetailsModel.findOne({user_ID: user._id});
        return res.status(200).json({
            type: 'successful',
            message: 'new user created',
            token: userToken,
            userDetails: useDetails,
            problemsStatus: useDetails.problems_status
        });

    } catch (error) {
        console.log('internal server Error :- ', error);
        return res.status(500).json({
            type: 'error',
            message: 'internal server Error'
        });
    }
});

/*  /api/user/email  --> this route check email exgist or not */

router.get('/is-valid/:name', async (req, res) => {
    try {
        const name = req.params.name;
        let isEmail = isValidEmail(name);

        if (!name) {
            return res.status(401).json({
                type: 'error',
                message: 'email is empty!'
            });
        }

        let user;
        if (isEmail) {
            user = await userModel.findOne({email: name});
        } else {
            user = await userModel.findOne({user_name: name});
        }
        if (user) {
            return res.status(200).json({
                type: 'successful',
                message: 'exists'
            });
        }

        return res.status(200).json({
            type: 'successful',
            message: 'not exists'
        });
    } catch (error) {
        console.log('internal server Error :- ', error);
        return res.status(500).json({
            type: 'error',
            message: 'internal server Error'
        });
    }
});

module.exports = router;
