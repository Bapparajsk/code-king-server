const {auth} = require("../middleware/authentication");
const router = require('express').Router();
const { validInputs } = require('../middleware/updateFile');
const userDetailsModel = require('../model/userDetails.schema');
const { Types } = require('mongoose');

router.patch('/user-details', auth, async (req, res) => {
    try {
        const { profile_image, user_name, email, about_me, county, student_professional, cursor } = req.body;
        const user = req.user;

        const updateFields = validInputs(profile_image, user_name, email, about_me, county, student_professional, cursor);

        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({
                type: 'error',
                massage: 'No update fields provided'
            });
        }

        const updateUser = await userDetailsModel.findOneAndUpdate({user_ID: new Types.ObjectId(user._id)}, updateFields, { new : true});

        return res.status(200).json({
            type: 'success',
            massage: 'user details update successfully',
            user: updateUser
        });

    } catch (error) {
        console.log('internal server error :- ', error);
        return res.status(500).json({
            type: 'error',
            massage: 'internal server error'
        });
    }
});

router.patch('/problem/submission', auth, async (req, res) => {
    try {
        const { problemNumber, massage } = req.body;

        if (!problemNumber || !massage) {
            return res.status(400).json({
                type: 'error',
                massage: 'No update fields provided'
            });
        }

        const user = req.user;
        const userFindById = await userDetailsModel.findOne({user_ID: new Types.ObjectId(user._id)});

        if (!userFindById) {
            return res.status(400).json({
                type: 'error',
                massage: 'user not found!'
            });
        }

        const updatedUser = await userDetailsModel.findOneAndUpdate(
            { user_ID: new Types.ObjectId(user._id) },
            { $push: { [`problem_submissions_logs.${problemNumber}`]: massage } },
            { new: true }
        );

        return res.status(200).json({
            type: 'ok',
            massage: 'submission update successfully',
        });

    } catch (error) {
        console.log('internal server error :- ', error);
        return res.status(500).json({
            type: 'error',
            massage: 'internal server error'
        });
    }
});

module.exports = router;
