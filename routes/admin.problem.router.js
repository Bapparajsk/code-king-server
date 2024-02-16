const router = require('express').Router();
const { adminAuth } = require('../middleware/authentication');
const problemModel = require('../model/problem.schema');
const {Types} = require("mongoose");
const { updateFile } = require('../middleware/updateFile');

router.post('/add-problem', adminAuth, async (req, res) => {
    try {
        const { number, hading, statement, example, constraints, difficulty } = req.body;
        const newProblem = new problemModel({ number, hading, statement, example, constraints, difficulty });
        await newProblem.save();
        return res.status(201).json({
            type: 'successful',
            massage: 'new problem add successful'
        })
    } catch (error) {
        console.log('internal server error :- ', error);
        return res.status(500).json({
            type: 'error',
            massage: 'internal server error'
        });
    }
})

router.patch('/update-problem', adminAuth, async (req, res) => {
    try {
        const { id, number, hading, statement, example, constraints } = req.body;
        const _id = new Types.ObjectId(id);

        // Initialize updateFields object
        const updateFields = updateFile({ number, hading, statement, example, constraints });

        // Check if updateFields is empty
        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({
                type: 'error',
                massage: 'No update fields provided'
            });
        }

        // Update the problem document
        const updatedProblem = await problemModel.findByIdAndUpdate(_id, updateFields, { new: true });

        // Check if the problem with the given _id is not found
        if (!updatedProblem) {
            return res.status(404).json({
                type: 'error',
                massage: 'Problem not found'
            });
        }

        return res.status(200).json({
            type: 'successful',
            message: 'Problem updated successfully',
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