const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    totalNumberOfQuestions: {
        type: Number,
        required: true,
    },
    totalNumberOfCorrectAnswers: {
        type: Number,
        required: true,
    },
    totalNumberOfWrongAnswers: {
        type: Number,
        required: true,
    },
    totalNumberOfUnattemptedQuestions: {
        type: Number,
        required: true,
    },
    totalNumberOfNoAnswers: {
        type: Number,
        required: true,
    },
    totalPercentage: {
        type: Number,
        required: true,
    }
})

const Result = mongoose.model('Result', ResultSchema)

module.exports = Result