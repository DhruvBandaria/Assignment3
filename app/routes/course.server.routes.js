const student = require('../../app/controllers/student.server.controller');
const course = require('../../app/controllers/course.server.controller');
//
module.exports = function (app) {
        app.route('/api/courses')
            .get(course.list)
            .post(student.requiresLogin, course.create);
        //
        app.route('/api/courses/:courseId')
            .get(course.read)
            .put(student.requiresLogin, course.hasAuthorization, course.update)
            .delete(student.requiresLogin, course.hasAuthorization, course.delete);
        //
        app.param('courseId', course.courseById);
};
