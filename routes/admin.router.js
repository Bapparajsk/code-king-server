const router = require('express').Router();
const problemModel = require('../model/problem.schema')
const { createToken } = require("../middleware/token");
router.post('/singin', async (req, res) => {
    try {
        const { key, value } = req.body;
        if (key !== process.env.ADMIN_KEY || value !== process.env.ADMIN_VALUE) {
            return res.status(500).json({
                type: 'unsuccessful',
                massage: 'invalid key and value'
            });
        }

        const token = createToken();
        const problems = await problemModel.find({});
        console.log(key , value);
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
})

module.exports = router;