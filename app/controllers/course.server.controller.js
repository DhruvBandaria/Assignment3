const mongoose = require('mongoose');
const Course = mongoose.model('Course');
const Student = require('mongoose').model('Student');

//
function getErrorMessage(err) {
    if (err.errors) {
        for (let errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].
                message;
        }
    } else {
        return 'Unknown server error';
    }
};
//
exports.create = function (req, res) {
    const course = new Course();
    console.log(req.body.courseCode);
    course.courseCode = req.body.courseCode;
    course.courseName = req.body.courseName;
    course.section = req.body.section;
    course.semester = req.body.semester;
    //article.creator = req.body.username;
    console.log(req.body)
    //
    //
    Student.findOne({studentNumber: req.body.studentId}, (err, user) => {

        if (err) { return getErrorMessage(err); }
        //
        console.log('studentNumber', user.studentNumber);
        req.id = user._id;
        console.log('user._id',req.id);

	
    }).then( function () 
    {
        course.studentId = req.id
        console.log('req.user._id',req.id);

        course.save((err) => {
            if (err) {
                console.log('error', getErrorMessage(err))

                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                res.status(200).json(course);
            }
        });
    
    });
};
//
exports.list = function (req, res) {
    Course.find().sort('-courseCode').populate('studentId', 'firstName lastName fullName').exec((err, courses) => {
    if (err) {
        return res.status(400).send({
            message: getErrorMessage(err)
        });
    } else {
        res.status(200).json(courses);
    }
});
};

exports.courseById = function (req, res, next,id) {
    console.log('in courseByID', req.body);
    Course.findById(id).populate('studentId', 'firstName lastName fullName')
    .exec((err, course) => {if (err) return next(err);
    if (!course) return next(new Error('Failed to load course '+ id));
        req.course = course;
        console.log('in courseById:', req.course)
        next();
    });
};
//
exports.courseByStudentId = function (req, res, next) {
    console.log('in courseByID'+req.student);
    Course.find({studentId: req.student._id}).populate('studentId', 'firstName lastName fullName')
    .exec((err, course) => {if (err) return next(err);
    if (!course) return next(new Error('Failed to load course '+ id));
        req.course = course;
        console.log('in courseById Inner:', req.course)
        res.status(200).json(course);
    });
};
//
exports.read = function (req, res) {
    console.log('course.read', req.course);
    res.status(200).json(req.course);
};
//
exports.update = function (req, res) {
    console.log('in update:', req.course)
    // const course = req.course;
    // course.section = req.body.section;
    //course.content = req.body.content;
    // course.save((err) => {
    //     if (err) {
    //         return res.status(400).send({
    //             message: getErrorMessage(err)
    //         });
    //     } else {
    //         res.status(200).json(course);
    //     }
    // });
    console.log(req.body);
    Course.findByIdAndUpdate(req.course.id, req.body, function (err, course) {
      if (err) {
        console.log(err);
        return next(err);
      }
      res.json(course);
    });
};
//
exports.delete = function (req, res) {
    const course = req.course;
    course.remove((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(course);
        }
    });
};
//The hasAuthorization() middleware uses the req.article and req.user objects
//to verify that the current user is the creator of the current article
exports.hasAuthorization = function (req, res, next) {
    console.log('in hasAuthorization - creator: ',req.course.studentId.id)
    console.log('in hasAuthorization - user: ',req.id)
    //console.log('in hasAuthorization - user: ',req.user._id)


    if (req.course.studentId.id !== req.id) {
        return res.status(403).send({
            message: 'User is not authorized'
        });
    }
    next();
};
