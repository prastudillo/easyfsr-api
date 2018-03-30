import { Router } from 'express';
import * as Ctrl from './controller';

const router = Router();

/**
 * @api {post} /course addCourse
 * @apiGroup Course
 * @apiName addCourse
 *
 * @apiParam (Body Params) {Number} hoursPerWeek number of hours of course per week
 * @apiParam (Body Params) {String} school school course is being taken
 * @apiParam (Body Params) {Number} credit credit of course
 * @apiParam (Body Params) {String} courseNumber courseNumber of course
 * @apiParam (Body Params) {Number} id fsr id
 *
 * @apiSuccess {Object} course new Course is added
 * @apiSuccess {Number} course.courseID course ID
 * @apiSuccess {Number} course.hoursPerWeek number of hours of course per week
 * @apiSuccess {String} course.school school course is being taken
 * @apiSuccess {Number} course.credit credit of course
 * @apiSuccess {String} course.courseNumber courseNumber of course
 * @apiSuccess {Number} course.id fsr id
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "data": {
 *       "status": 200,
 *       "message": "Successfully created course",
 *       "data":
 *           {
 *               "courseID": 1,
 *               "hoursPerWeek": "3",
 *               "school": "uplb",
 *               "credit": "3",
 *               "courseNumber": "999",
 *               "id": 1
 *           }
 *   }
 *
 * @apiError (Error 500) {String} status error status code
 * @apiError (Error 500) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 */

router.post('/course', async (req, res) => {
  try {
    const courseID = await Ctrl.addCourse(req.body);
    const course = await Ctrl.getCourse({ courseID });

    res.status(200).json({
      status: 200,
      message: 'Successfully created course',
      data: course,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {put} /course/:courseID updateCourse
 * @apiGroup Course
 * @apiName updateCourse
 *
 * @apiParam (Query Params) {String} [courseNumber] courseNumber of course
 * @apiParam (Body Params) {Number} [hoursPerWeek] number of hours of course per week
 * @apiParam (Body Params) {String} [school] school course is being taken
 * @apiParam (Body Params) {Number} [credit] credit of course
 * @apiParam (Body Params) {String} [id] fsr id
 *
 * @apiSuccess {Object} course Course updated
 * @apiSuccess {Number} course.courseID course ID
 * @apiSuccess {Number} course.hoursPerWeek number of hours of course per week
 * @apiSuccess {String} course.school school course is being taken
 * @apiSuccess {Number} course.credit credit of course
 * @apiSuccess {String} course.courseNumber courseNumber of course
 * @apiSuccess {Number} course.id fsr id
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "data": {
 *       "status": 200,
 *       "message": "Successfully updated course",
 *       "data": [
 *         {
 *           "courseID": 1,
 *           "hoursPerWeek": "5",
 *           "school": "la salle",
 *           "credit": "5",
 *           "courseNumber": "999",
 *           "id": 1
 *        }
 *      ]
 *   }
 *
 *
 * @apiError (Error 500) {String} status error status code
 * @apiError (Error 500) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 * @apiError (Error 404) {String} status status code
 * @apiError (Error 404) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 404 User not found
 * {
 *   "status": 404,
 *   "message": "course not found"
 * }
 */

router.put('/course/:courseID', async (req, res) => {
  try {
    await Ctrl.updateCourse(req.params, req.body);
    const course = await Ctrl.getCourse(req.params);

    res.status(200).json({
      status: 200,
      message: 'Successfully updated course',
      data: course,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Course not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {delete} /course/:courseNumber deleteCourse
 * @apiGroup Course
 * @apiName deleteCourse
 *
 * @apiParam (Query Params) {String} courseNumber courseNumber of course
 *
 * @apiSuccess {Object} course Course course deleted
 * @apiSuccess {Number} course.courseID course ID
 * @apiSuccess {Number} course.hoursPerWeek number of hours of course per week
 * @apiSuccess {String} course.school school course is being taken
 * @apiSuccess {Number} course.credit credit of course
 * @apiSuccess {String} course.courseNumber courseNumber of course
 * @apiSuccess {Number} course.id fsr id
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "data": {
 *       "status": 200,
 *       "message": "Successfully deleted course",
 *       "data": [
 *         {
 *           "courseID": 1,
 *           "hoursPerWeek": "5",
 *           "school": "la salle",
 *           "credit": "5",
 *           "courseNumber": "999",
 *           "id": 1
 *        }
 *      ]
 *   }
 *
 *
 * @apiError (Error 500) {String} status error status code
 * @apiError (Error 500) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 * @apiError (Error 404) {String} status status code
 * @apiError (Error 404) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 404 User not found
 * {
 *   "status": 404,
 *   "message": "course not found"
 * }
 */

router.delete('/course/:courseID', async (req, res) => {
  try {
    const course = await Ctrl.getCourse(req.params);
    await Ctrl.deleteCourse(req.params);

    res.status(200).json({
      status: 200,
      message: 'Successfully deleted course',
      data: course,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Course not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {get} /course/:courseID getCourse
 * @apiGroup Course
 * @apiName getCourse
 *
 * @apiParam (Query Params) {Number} courseID courseID of course
 *
 * @apiSuccess {Object} course Course details
 * @apiSuccess {Number} course.courseID course ID
 * @apiSuccess {Number} course.hoursPerWeek number of hours of course per week
 * @apiSuccess {String} course.school school course is being taken
 * @apiSuccess {Number} course.credit credit of course
 * @apiSuccess {String} course.courseNumber courseNumber of course
 * @apiSuccess {Number} course.id fsr
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "data": {
 *       "status": 200,
 *       "message": "Successfully fetched course",
 *       "data": [
 *         {
 *           "courseID": 1,
 *           "hoursPerWeek": "5",
 *           "school": "la salle",
 *           "credit": "5",
 *           "courseNumber": "999",
 *           "id": 1
 *        }
 *      ]
 *   }
 *
 *
 * @apiError (Error 500) {String} status error status code
 * @apiError (Error 500) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 * @apiError (Error 404) {String} status status code
 * @apiError (Error 404) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 404 User not found
 * {
 *   "status": 404,
 *   "message": "course not found"
 * }
 */

router.get('/course/:courseID', async (req, res) => {
  try {
    const course = await Ctrl.getCourse(req.params);

    res.status(200).json({
      status: 200,
      message: 'Successfully fetched course',
      data: course,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Course not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {get} /course getCourses
 * @apiGroup Course
 * @apiName getCourses
 *
 * @apiParam (Query Params) {Number} [hoursPerWeek] number of hours of course per week
 * @apiParam (Query Params) {String} [school] school course is being taken
 * @apiParam (Query Params) {Numner} [credit] credit of course
 * @apiParam (Query Params) {Number} [courseNumber] courseNumber of course
 * @apiParam (Query Params) {Number} [page] page number
 * @apiParam (Query Params) {Number} [limit] count limit of courses to fetch
 * @apiParam (Query Params) {String} [sortBy] sort data by 'ASC' or 'DESC'
 * @apiParam (Query Params) {String} [field] order data depending on this field. Default value is 'courseNumber'
 *
 * @apiSuccess {Object[]} courses All courses
 * @apiSuccess {String} course.courseID course ID
 * @apiSuccess {String} course.hoursPerWeek number of hours of course per week
 * @apiSuccess {String} course.school school course is being taken
 * @apiSuccess {String} course.credit credit of course
 * @apiSuccess {String} course.courseNumber courseNumber of course
 * @apiSuccess {String} course.id fsr id
 *
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *   {
 *      "status": 200,
 *      "message": "Successfully fetched courses",
 *      "data": [
 *        {
 *          "courseID": 2,
 *          "hoursPerWeek": "21",
 *          "school": "uplb",
 *          "credit": "3",
 *          "courseNumber": "128",
 *          "id": 1
 *        },
 *        {
 *          "courseID": 2,
 *          "hoursPerWeek": "21",
 *          "school": "uplb",
 *          "credit": "3",
 *          "courseNumber": "128",
 *          "id": 1
 *        },
 *      ],
 *     "total": 2,
 *     "limit": 2,
 *     "page": 8,
 *     "pages": 8
 *  }
 *
 * @apiError (Error 500) {String} status error status code
 * @apiError (Error 500) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 * @apiError (Error 404) {String} status status code
 * @apiError (Error 404) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 404 User not found
 * {
 *   "status": 404,
 *   "message": "Course/s not found"
 * }
 */

router.get('/course', async (req, res) => {
  try {
    const courses = await Ctrl.getCourses(req.query);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched courses',
      data: courses,
      total: (await Ctrl.getTotalCourses(req.query)).total,
      limit: parseInt(req.query.limit) || 12,
      page: parseInt(req.query.page) || 1,
      pages: Math.ceil(
        (await Ctrl.getTotalCourses(req.query)).total /
          (parseInt(req.query.limit) || 12),
      ),
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Course not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

export default router;
