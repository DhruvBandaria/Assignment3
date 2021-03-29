const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CourseSchema = new Schema({
    courseCode: {
        type: String,
        unique: true,
        required: 'Course Code cannot be empty'
    },
    courseName: {
        type: String,
        required: 'Course Name cannot be empty'
    },
    section: {
        type: Number,
        required: 'Section Number cannot be empty'
    },
    semester: {
        type: Number,
        required: 'Semester cannot be empty'
    },
    studentId: {
        type: Schema.ObjectId,
        ref: 'Student'
    }
});
mongoose.model('Course', CourseSchema);
