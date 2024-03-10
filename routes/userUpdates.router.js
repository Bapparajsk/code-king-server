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
})

module.exports = router;