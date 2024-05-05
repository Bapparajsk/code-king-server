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
                type: 'error',
                massage: 'user not found!'
            });
        }

        const { user_name, email, profile_image, county, about_me, student_professional, cursor, problem_difficulty, user_submissions_logs} = User;

        const userDetails = {user_name, email, profile_image, county, about_me, student_professional, cursor};

        return res.status(200).json({
            type: 'successful',
            message: 'user found',
            userDetails,
            problem_difficulty,
            user_submissions_logs,
        });
    } catch (error) {
        console.log('internal server Error :- ', error);
        return res.status(500).json({
            type: 'error',
            message: 'internal server Error'
        });
    }
});

router.get('/submissions', auth, async (req, res) => {
    try {
        const id = req.query.id;
        if (!id) {
            return res.status(500).json({
                type: 'error',
                message: 'id not found'
            });
        }

        const user_ID = new Types.ObjectId(req.user._id);
        const User = await userDetailsModel.findOne({user_ID});

        if (!User) {
            return res.status(401).json({
                type: 'unauthorized',
                massage: 'invalid token'
            });
        }

        const { problem_submissions_logs } = User;

        const logs = problem_submissions_logs[id] === undefined ? [] : problem_submissions_logs[id];
        console.log(logs);
        return res.status(200).json({
            type: 'successful',
            message: 'user found',
            submissions: logs,
        });

    } catch (error) {
        console.log('internal server Error :- ', error);
        return res.status(500).json({
            type: 'error',
            message: 'internal server Error'
        });
    }
});

router.get('/get-solve-problem-id', auth, async (req, res) => {
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
            problemsStatus: User.problems_status,
        });

    } catch (error) {
        console.log('internal server Error :- ', error);
        return res.status(500).json({
            type: 'error',
            message: 'internal server Error'
        });
    }
});

router.get('/user_submissions_logs', auth, async (req, res) => {
    try {

        const user_ID = new Types.ObjectId(req.user._id);
        const User = await userDetailsModel.findOne({user_ID});

        if (!User) {
            return res.status(401).json({
                type: 'unauthorized',
                massage: 'invalid token'
            });
        }

        const { user_submissions_logs } = User;

        return res.status(200).json({
            type: 'successful',
            message: 'user found',
            userSubmissionsLogs: user_submissions_logs,
        });

    } catch (error) {
        console.log('internal server Error :- ', error);
        return res.status(500).json({
            type: 'error',
            message: 'internal server Error'
        });
    }
});

router.get('/user_progress', auth, async (req, res) => {
    try {

        const user_ID = new Types.ObjectId(req.user._id);
        const User = await userDetailsModel.findOne({user_ID});

        if (!User) {
            return res.status(401).json({
                type: 'unauthorized',
                massage: 'invalid token'
            });
        }

        const { problem_difficulty } = User;

        return res.status(200).json({
            type: 'successful',
            message: 'user found',
            problem_difficulty,
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
