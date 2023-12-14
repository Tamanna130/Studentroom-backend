const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    question:{
        type: String,
        required: true,
        trim: true
    },
    option1:{
        type: mongoose.Schema.Types.Mixed,
        trim: true
    },
    option2:{
        type: mongoose.Schema.Types.Mixed,
        trim: true
    },
    option3:{
        type: mongoose.Schema.Types.Mixed,
        trim: true
    },
    option4:{
        type: mongoose.Schema.Types.Mixed,
        trim: true
    },
    answer:{
        type: mongoose.Schema.Types.Mixed,
        required: true,
        trim: true
    }
})

const Question = mongoose.model('Question', QuestionSchema)
module.exports = Question;