const { auth } = require("../middleware/authentication");
const userDetailsModel = require('../model/userDetails.schema');
const { Types } = require("mongoose");
const router = require('express').Router();

router.get('/', auth, async (req, res) => {
    try {
        const user_ID = new Types.ObjectId(req.user._id);
        const User = await userDetailsModel.findOne({user_ID});

        if (!User) {
            return res.status(401).json({
                type: 'unauthorized',
                massage: 'invalid token'
            });
        }
        return res.status(200).json({
            type: 'successful',
            message: 'user found',
            userDetails: User,
            problemsStatus: User.problems_status
        });
    } catch (error) {
        console.log('internal server Error :- ', error);
        return res.status(500).json({
            type: 'error',
            message: 'internal server Error'
        });
    }
})

module.exports = router;