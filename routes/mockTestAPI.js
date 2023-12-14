const express = require("express");
const router = express.Router();
const ExamCategory = require('../models/ExamCategory');
const loginVerification = require("../middlewares/checkLogin")
router.use('/api', loginVerification)

router.get('/examCategory/all', async (req, res) => {
    try {
        const allExamCategory = await ExamCategory.find()
        res.send(allExamCategory)
    } catch (err) {
        console.log(err)
        if (err == "Authentication failure!") {
            res.status(401).send({ error: err })
        } else {
            res.status(500).send(err)
        }
    }

})

router.post('/examCategory/create', async (req, res) => {
    try {
        console.log(req.body)
        const examCategory = new ExamCategory({ ...req.body })
        await examCategory.save()
        res.status(200).send(examCategory)
    } catch (err) {
        console.log(err)
        res.status(500).send({ error: err.message })
    }
})

router.delete('/examCategory/delete', async (req, res) => {
    try {
        const examCategory = await ExamCategory.findByIdAndDelete(req.body.id)
        res.status(200).send(examCategory)
    } catch (err) {
        console.log(err)
        res.status(500).send({ error: err.message })
    }
})
router.put('/examCategory/update', async (req, res) => {
    try {
        const { _id } = req.body; // Get the ID from the request body
        console.log(req.body)
        // Find the document to update using the ID
        const examCategory = await ExamCategory.findOne({ _id });

        if (!examCategory) {
            // Handle document not found
            return res.status(404).json({ message: 'Exam category not found' });
        }

        // Update the document with the provided data
        const { courseName, topicName, examTime } = req.body; // Get updated data from the request body
        Object.assign(examCategory, { courseName, topicName, examTime }); // Merge updated data

        // Save the updated document
        await examCategory.save();

        res.json({ message: 'Exam category updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router