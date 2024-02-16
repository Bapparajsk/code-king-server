const router = require('express').Router();
const problemModel = require('../model/problem.schema')
const { createToken } = require("../middleware/token");
const { adminAuth } = require("../middleware/authentication");

//   --> /admin/singin
router.post('/singin', async (req, res) => {
    try {
        const { keyName, key } = req.body;
        console.log(keyName, key);
        if (keyName !== process.env.ADMIN_KEY || key !== process.env.ADMIN_VALUE) {
            return res.status(500).json({
                type: 'unsuccessful',
                massage: 'invalid key and value'
            });
        }

        const token = createToken();
        const problems = await problemModel.find({});
        return res.status(200).json({
            type: 'successful',
            massage: 'singin successful',
            token: token,
            data : {
                length : problems.length,
                problems
            }
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