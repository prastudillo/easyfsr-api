import { Router } from 'express';
import bcrypt from 'bcrypt';
import * as Ctrl from './controller';

const router = Router();

/**
 * @api {post} /subject addSubject
 * @apiGroup Subject
 * @apiName addSubject

 * @apiParam (Body Params) {Integer} subject.id ID of subject
 * @apiParam (Body Params) {String} subject.subjectCode subject code of subject
 * @apiParam (Body Params) {Integer} subject.teachingLoadCreds teaching load credits of subject
 * @apiParam (Body Params) {Integer} subject.noOfStudents number of students enrolled in the subject
 * @apiParam (Body Params) {Integer} subject.hoursPerWeek number of hours per week subject takes up
 * @apiParam (Body Params) {String} subject.sectionCode section code of subject
 * @apiParam (Body Params) {Integer} subject.room room where subject is being taught
 *
 * @apiSuccess {Object}  subject subject added
 * @apiSuccess {Integer} subject.id ID of FSR
 * @apiSuccess {String} subject.subjectCode subject code of subject
 * @apiSuccess {Integer} subject.subjectID ID of subject
 * @apiSuccess {Integer} subject.teachingLoadCreds teaching load credits of subject
 * @apiSuccess {Integer} subject.noOfStudents number of students enrolled in the subject
 * @apiSuccess {Integer} subject.hoursPerWeek number of hours per week subject takes up
 * @apiSuccess {String} subject.sectionCode section code of subject
 * @apiSuccess {String} subject.room room where subject is being taught
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *      "status": 200,
        "message": "Successfully created subject",
        "data": [
            {
                "id": 5,
                "subjectCode": "NEW",
                "subjectID": 20,
                "teachingLoadCreds": 1,
                "noOfStudents": 1,
                "hoursPerWeek": 1,
                "sectionCode": "a",
                "room": "A"
            }
        ]
 *   }
 *
 * @apiError (Error 500) {Integer} errors.status 500
 * @apiError (Error 500) {String} errors.message Internal server error

 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 */

router.post('/subject/', async (req, res) => {
  try {
    const subjectID = await Ctrl.addSubject(req.body);
    const subject = await Ctrl.getSubject({ subjectID });
    res.status(200).json({
      status: 200,
      message: 'Successfully created subject',
      data: subject,
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
 * @api {get} /subject/:subjectID getSubject
 * @apiGroup Subject
 * @apiName getSubject
 *
 * @apiParam (Query Params) {Integer} subjectID ID of subject
 *
 * @apiSuccess {Object} subject Subject fetched
 * @apiSuccess {Integer} subject.id ID of FSR
 * @apiSuccess {Integer} subject.subjectCode subject code of subject
 * @apiSuccess {String} subject.subjectID ID of subject
 * @apiSuccess {Integer} subject.teachingLoadCreds teaching load credits of subject
 * @apiSuccess {Integer} subject.noOfStudents number of students enrolled in the subject
 * @apiSuccess {Integer} subject.hoursPerWeek number of hours per week subject takes up
 * @apiSuccess {String} subject.sectionCode section code of subject
 * @apiSuccess {String} subject.room room where subject is being taught
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *  {
 *    "status": 200,
 *    "message": "Successfully fetched subject",
 *    "data": [
 *       {
 *           "id": 1,
 *           "subjectCode": "Hi",
 *           "subjectID": 1,
 *           "teachingLoadCreds": 1,
 *           "noOfStudents": 5,
 *           "hoursPerWeek": 1,
 *           "sectionCode": "Hello",
 *           "room": 1
 *       }
 *    ]
 *  }
 * @apiError (Error 500) {Integer} errors.status 500
 * @apiError (Error 500) {String} errors.message Internal server error
 * @apiError (Error 404) {Integer} errors.status 400
 * @apiError (Error 404) {String} errors.message Subject not found
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 *
 * HTTP/1.1 404 Subject not found
 * {
 *   "status": 404,
 *   "message": "Subject not found"
 * }
 */

router.get('/subject/:subjectID', async (req, res) => {
  try {
    const subject = await Ctrl.getSubject(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched subject',
      data: subject,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Subject not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});
/**
 * @api {get} /subject/ getSubjects
 * @apiGroup Subject
 * @apiName getSubjects
 * 
 * @apiSuccess {Object} subject Subjects fetched
 * @apiSuccess {Integer} subject.id ID of FSR
 * @apiSuccess {Integer} subject.subjectCode subject code of subject
 * @apiSuccess {String} subject.subjectID ID of subject
 * @apiSuccess {Integer} subject.teachingLoadCreds teaching load credits of subject
 * @apiSuccess {Integer} subject.noOfStudents number of students enrolled in the subject
 * @apiSuccess {Integer} subject.hoursPerWeek number of hours per week subject takes up
 * @apiSuccess {String} subject.sectionCode section code of subject
 * @apiSuccess {String} subject.room room where subject is being taught
 *
 @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *  {
 *    "status": 200,
 *    "message": "Successfully fetched subjects",
 *    "data": [
 *       {
 *           "id": 1,
 *           "subjectCode": "Hi",
 *           "subjectID": 1,
 *           "teachingLoadCreds": 1,
 *           "noOfStudents": 5,
 *           "hoursPerWeek": 1,
 *           "sectionCode": "Hello",
 *           "room": 1
 *       },
 *       {
 *           "id": 2,
 *           "subjectCode": "Hi",
 *           "subjectID": 2,
 *           "teachingLoadCreds": 1,
 *           "noOfStudents": 5,
 *           "hoursPerWeek": 1,
 *           "sectionCode": "Hello",
 *           "room": 2
 *       }
 *    ]
 *  }
 * @apiError (Error 500) {Integer} errors.status 500
 * @apiError (Error 500) {String} errors.message Internal server error
  * @apiError (Error 404) {Integer} errors.status 400
 * @apiError (Error 404) {String} errors.message Subjects not found
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 *
 * HTTP/1.1 404 Subjects not found
 * {
 *   "status": 404,
 *   "message": "Subjects not found"
 * }
 */
router.get('/subject/', async (req, res) => {
  try {
    const subjects = await Ctrl.getSubjects(req.query);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched subjects',
      data: subjects,
      total: subjects.length,
      limit: req.query.limit || 12,
      page: req.query.page || 1,
      pages: Math.ceil(subjects.length / (req.query.limit || 12)),
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'User not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {put} /subject/:subjectID updateSubject
 * @apiGroup Subject
 * @apiName updateSubject
 *
 * @apiParam (Query Params) {Integer} subjectID ID of subject

 * @apiParam (Body Params) {String} subject.subjectCode subject code of subject
 * @apiParam (Body Params) {Integer} subject.teachingLoadCreds teaching load credits of subject
 * @apiParam (Body Params) {Integer} subject.noOfStudents number of students enrolled in the subject
 * @apiParam (Body Params) {Integer} subject.hoursPerWeek number of hours per week subject takes up
 * @apiParam (Body Params) {String} subject.sectionCode section code of subject
 * @apiParam (Body Params) {Integer} subject.room room where subject is being taught
 *
 *
 * @apiSuccess {Object} subject Subject updated
 * @apiSuccess {Integer} subject.id ID of subject
 * @apiSuccess {String} subject.subjectCode subject code of subject
 * @apiSuccess {Integer} subject.subjectID subject ID of subject
 * @apiSuccess {Integer} subject.teachingLoadCreds teaching load credits of subject
 * @apiSuccess {Integer} subject.noOfStudents number of students enrolled in the subject
 * @apiSuccess {Integer} subject.hoursPerWeek number of hours per week subject takes up
 * @apiSuccess {String} subject.sectionCode section code of subject
 * @apiSuccess {String} subject.room room where subject is being taught
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *  {
      "status": 200,
      "message": "Successfully updated subject",
      "data": [
          {
              "id": 1,
              "subjectCode": "NEW CODE",
              "subjectID": 1,
              "teachingLoadCreds": 2,
              "noOfStudents": 2,
              "hoursPerWeek": 2,
              "sectionCode": "sd",
              "room": "12"
          }
      ]
    }
 *   
 *
 * @apiError (Error 500) {Integer} errors.status 500
 * @apiError (Error 500) {String} errors.message Internal server error
  * @apiError (Error 404) {Integer} errors.status 400
 * @apiError (Error 404) {String} errors.message Subject not found
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
    HTTP/1.1 404 Subject not found
 * {
 *   "status": 404,
 *   "message": "Subject not found"
 * }
 */

router.put('/subject/:subjectID', async (req, res) => {
  try {
    await Ctrl.updateSubject(req.params, req.body);
    const subject = await Ctrl.getSubject(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully updated subject',
      data: subject,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Subject not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {delete} /subject/:subjectID deleteSubject
 * @apiGroup Subject
 * @apiName deleteSubject
 *
 * @apiParam (Query Params) {Integer} subjectID ID of subject
 *
 * @apiSuccess {Object} subject Subject deleted
 * @apiSuccess {Integer} subject.id ID of FSR
 * @apiSuccess {String} subject.subjectCode subject code of subject
 * @apiSuccess {Integer} subject.subjectID ID of subject
 * @apiSuccess {Integer} subject.teachingLoadCreds teaching load credits of subject
 * @apiSuccess {Integer} subject.noOfStudents number of students enrolled in the subject
 * @apiSuccess {Integer} subject.hoursPerWeek number of hours per week subject takes up
 * @apiSuccess {String} subject.sectionCode section code of subject
 * @apiSuccess {String} subject.room room where subject is being taught
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *        "status": 200;
 *        "message": 'Succesfully deleted subject'
          "data": [
          {
            "id": 1,
            "subjectCode": "NEW CODE",
            "subjectID": 1,
            "teachingLoadCreds": 2,
            "noOfStudents": 2,
            "hoursPerWeek": 2,
            "sectionCode": "sd",
            "room": "12"
          }
      ]
 *   }
 *
 * @apiError (Error 500) {Integer} errors.status 500
 * @apiError (Error 500) {String} errors.message Internal server error
 * @apiError (Error 404) {Integer} errors.status 400
 * @apiError (Error 404) {String} errors.message Subject not found
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 *
 * HTTP/1.1 404 Subject not found
 * {
 *   "status": 404,
 *   "message": "Subject not found"
 * }
 */

router.delete('/subject/:subjectID', async (req, res) => {
  try {
    const subject = await Ctrl.getSubject(req.params);
    await Ctrl.deleteSubject(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully deleted subject',
      data: subject,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Subject not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

//ADDITIONAL GET FOR SUBJECTS

/**
 * @api {get} /subjectWithTimeslot/ getSubjectsWithSched
 * @apiGroup Subject
 * @apiName getSubjectsWithSched
 * 
 * @apiSuccess {Object} subject Subjects fetched
 * @apiSuccess {Integer} subject.id ID of FSR
 * @apiSuccess {Integer} subject.subjectCode subject code of subject
 * @apiSuccess {String} subject.subjectID ID of subject
 * @apiSuccess {Integer} subject.teachingLoadCreds teaching load credits of subject
 * @apiSuccess {Integer} subject.noOfStudents number of students enrolled in the subject
 * @apiSuccess {Integer} subject.hoursPerWeek number of hours per week subject takes up
 * @apiSuccess {String} subject.sectionCode section code of subject
 * @apiSuccess {String} subject.room room where subject is being taught
 * @apiSuccess {String} timeslot.day day assigned to timeslot
 * @apiSuccess {String} timeslot.time time assigned to timeslot
 *
 @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *  {
 *    "status": 200,
 *    "message": "Successfully fetched subjects",
 *     "data": [
        {
            "subjectID": 3,
            "id": 2,
            "subjectCode": "YOOOO",
            "teachingLoadCreds": 1,
            "noOfStudents": 1,
            "hoursPerWeek": 1,
            "sectionCode": "b",
            "room": "c",
            "day": "12",
            "time": "12"
        },
        {
            "subjectID": 4,
            "id": 1,
            "subjectCode": "YOOOONEW",
            "teachingLoadCreds": 1,
            "noOfStudents": 1,
            "hoursPerWeek": 1,
            "sectionCode": "b",
            "room": "c",
            "day": "1-1",
            "time": "1-1"
        }
    ]
 *  }
 * @apiError (Error 500) {Integer} errors.status 500
 * @apiError (Error 500) {String} errors.message Internal server error
  * @apiError (Error 404) {Integer} errors.status 400
 * @apiError (Error 404) {String} errors.message Subjects not found
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 *
 * HTTP/1.1 404 Subjects not found
 * {
 *   "status": 404,
 *   "message": "Subjects not found"
 * }
 */

router.get('/subjectWithTimeslot/', async (req, res) => {
  try {
    const subjects = await Ctrl.getSubjectsWithSched(req.query);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched subjects',
      data: subjects,
      total: subjects.length,
      limit: req.query.limit || 12,
      page: req.query.page || 1,
      pages: Math.ceil(subjects.length / (req.query.limit || 12)),
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Subjects not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {get} /subjectWithTimeslot/:subjectID getSubjectWithSched
 * @apiGroup Subject
 * @apiName getSubjectWithSched
 *
 * @apiParam (Query Params) {Integer} subjectID ID of subject
 *
 * @apiSuccess {Object} subject Subject fetched
 * @apiSuccess {Integer} subject.id ID of FSR
 * @apiSuccess {Integer} subject.subjectCode subject code of subject
 * @apiSuccess {String} subject.subjectID ID of subject
 * @apiSuccess {Integer} subject.teachingLoadCreds teaching load credits of subject
 * @apiSuccess {Integer} subject.noOfStudents number of students enrolled in the subject
 * @apiSuccess {Integer} subject.hoursPerWeek number of hours per week subject takes up
 * @apiSuccess {String} subject.sectionCode section code of subject
 * @apiSuccess {String} subject.room room where subject is being taught
 * @apiSuccess {String} timeslot.day day assigned to timeslot
 * @apiSuccess {String} timeslot.time time assigned to timeslot
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *  {
 *    "status": 200,
 *    "message": "Successfully fetched subject",
 *    "data": [
        {
            "subjectID": 3,
            "id": 2,
            "subjectCode": "YOOOO",
            "teachingLoadCreds": 1,
            "noOfStudents": 1,
            "hoursPerWeek": 1,
            "sectionCode": "b",
            "room": "c",
            "day": "12",
            "time": "12"
        }
      ]
 *  }
 * @apiError (Error 500) {Integer} errors.status 500
 * @apiError (Error 500) {String} errors.message Internal server error
 * @apiError (Error 404) {Integer} errors.status 400
 * @apiError (Error 404) {String} errors.message Subject not found
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 *
 * HTTP/1.1 404 Subject not found
 * {
 *   "status": 404,
 *   "message": "Subject not found"
 * }
 */

router.get('/subjectWithTimeslot/:subjectID', async (req, res) => {
  try {
    const subject = await Ctrl.getSubjectWithSched(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched subject',
      data: subject,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Subject not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {get} /subjectTotal/ getTotalSubjects
 * @apiGroup Subject
 * @apiName getTotalSubjects
 * *
 * @apiSuccess {Integer} total total number of subjects
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *  {
      "status": 200,
      "message": "Successfully fetched subjects count",
      "data": [
          {
              "total": 11
          }
      ]
    }
 * @apiError (Error 500) {Integer} errors.status 500
 * @apiError (Error 500) {String} errors.message Internal server error
 * @apiError (Error 404) {Integer} errors.status 400
 * @apiError (Error 404) {String} errors.message Subjects not found
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 *
 * HTTP/1.1 404 Subjects not found
 * {
 *   "status": 404,
 *   "message": "Subjects not found"
 * }
 */

router.get('/subjectTotal/', async (req, res) => {
  try {
    const totalSubjects = await Ctrl.getTotalSubjects(req.query);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched subjects count',
      data: totalSubjects,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Subjects not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {get} /subjectTotal/:id getTotalSubjectsByFSR
 * @apiGroup Subject
 * @apiName getTotalSubjectsByFSR
 *
 * @apiParam (Query Params) {Integer} subject.id ID of FSR
 *
 * @apiSuccess {Integer} total total number of subjects
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *  {
      "status": 200,
      "message": "Successfully fetched subjects count",
      "data": [
          {
              "total": 11
          }
      ]
    }
 * @apiError (Error 500) {Integer} errors.status 500
 * @apiError (Error 500) {String} errors.message Internal server error
 * @apiError (Error 404) {Integer} errors.status 400
 * @apiError (Error 404) {String} errors.message Subjects not found
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 *
 * HTTP/1.1 404 Subjects not found
 * {
 *   "status": 404,
 *   "message": "Subjects not found"
 * }
 */

router.get('/subjectTotal/:id', async (req, res) => {
  try {
    const totalSubjects = await Ctrl.getTotalSubjectsByFSR(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched subjects count',
      data: totalSubjects,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Subjects not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {delete} /subject/ deleteSubjects
 * @apiGroup Subject
 * @apiName deleteSubjects
 *
 * @apiSuccess {Object} subjects Subjects deleted
 * @apiSuccess {Integer} subject.id ID of FSR
 * @apiSuccess {String} subject.subjectCode subject code of subject
 * @apiSuccess {Integer} subject.subjectID ID of subject
 * @apiSuccess {Integer} subject.teachingLoadCreds teaching load credits of subject
 * @apiSuccess {Integer} subject.noOfStudents number of students enrolled in the subject
 * @apiSuccess {Integer} subject.hoursPerWeek number of hours per week subject takes up
 * @apiSuccess {String} subject.sectionCode section code of subject
 * @apiSuccess {String} subject.room room where subject is being taught
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
      "status": 200,
      "message": "Successfully deleted subjects",
      "data": [
          {
              "id": 3,
              "subjectCode": "HUHU",
              "subjectID": 9,
              "teachingLoadCreds": 2,
              "noOfStudents": 2,
              "hoursPerWeek": 2,
              "sectionCode": "sd",
              "room": "12"
          },
          {
              "id": 8,
              "subjectCode": "HUHU",
              "subjectID": 13,
              "teachingLoadCreds": 2,
              "noOfStudents": 2,
              "hoursPerWeek": 2,
              "sectionCode": "sd",
              "room": "12"
          },
          {
              "id": 5,
              "subjectCode": "NEW",
              "subjectID": 19,
              "teachingLoadCreds": 1,
              "noOfStudents": 1,
              "hoursPerWeek": 1,
              "sectionCode": "a",
              "room": "A"
          }
      ]
}
 *
 * @apiError (Error 500) {Integer} errors.status 500
 * @apiError (Error 500) {String} errors.message Internal server error
 * @apiError (Error 404) {Integer} errors.status 400
 * @apiError (Error 404) {String} errors.message Subjects not found
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 *
 * HTTP/1.1 404 Subjects not found
 * {
 *   "status": 404,
 *   "message": "Subjects not found"
 * }
 */

router.delete('/subject/', async (req, res) => {
  try {
    const subject = await Ctrl.getSubjects(req.query);
    await Ctrl.deleteSubjects(req.query);
    res.status(200).json({
      status: 200,
      message: 'Successfully deleted subjects',
      data: subject,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Subjects not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

export default router;
