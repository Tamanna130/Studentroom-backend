const mongoose = require("mongoose");

const ExamCategorySchema = mongoose.Schema({
    courseName: {
        type: String,
        required: true,
    },
    topicName: {
        type: String,
        required: true,
    },
    examTime: {
        type: String,
        required: true,
    },
});

const ExamCategory = mongoose.model('ExamCategory', ExamCategorySchema)
module.exports = ExamCategory;
