import { Router } from 'express';
import bcrypt from 'bcrypt';
import * as Ctrl from './controller';

const router = Router();
/**
 * @api {post} /timeslot/ addTimeslot
 * @apiGroup Timeslot
 * @apiName addTimeslot

 * @apiParam (Body Params) {Number} subjectID subject ID of subject
 * @apiParam (Body Params) {String} day day assigned to timeslot
 * @apiParam (Body Params) {Time} timeStart starting time of timeslot
 * @apiParam (Body Params) {Time} ttimeEnd dismissal time of timeslot
 *
 * @apiSuccess {Object}  timeslot timeslot added
 * @apiSuccess {Number} timeslot.timeslotID ID of timeslot
 * @apiSuccess {Number} timeslot.subjectID subject ID of timeslot
 * @apiSuccess {String} timeslot.day day assigned to timeslot
 * @apiSuccess {Time} timeslot.timeStart starting time of timeslot
 * @apiSuccess {Time} timeslot.timeEnd dismissal time of timeslot
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     {
        "status": 200,
        "message": "Successfully created timeslot",
        "data": 
            {
              "timeslotID": 19,
              "subjectID": 12,
              "day": "12",
              "timeStart": "23:00:00",
              "timeEnd": "24:00:00"
            }
        }
 *    }
 *
 * @apiError (Error 500) {Number} status status code
 * @apiError (Error 500) {String} message error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 */

router.post('/timeslot/', async (req, res) => {
  try {
    const timeslotID = await Ctrl.addTimeslot(req.body);
    const timeslot = await Ctrl.getTimeslot({ timeslotID });
    res.status(200).json({
      status: 200,
      message: 'Successfully created timeslot',
      data: timeslot,
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
 * @api {get} /timeslot/ getTimeslots
 * @apiGroup Timeslot
 * @apiName getTimeslots
 
 * @apiParam (Query Params) {Number} [subjectID] ID of subject
 * @apiParam (Query Params) {String} [day] day assigned to timeslot
 * @apiParam (Query Params) {Time} [timeStart] starting time of timeslot
 * @apiParam (Query Params) {Time} [timeEnd] dismissal time of timeslot
 * 
 *@apiSuccess {Object} timeslot timeslots fetched
 * @apiSuccess {Number} timeslot.timeslotID ID of timeslot
 * @apiSuccess {Number} timeslot.subjectID ID of subject 
 * @apiSuccess {String} timeslot.day day assigned to timeslot
 * @apiSuccess {Time} timeslot.timeStart starting time of timeslot
 * @apiSuccess {Time} timeslot.timeEnd dismissal time of timeslot
 *
 @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *  {
    "status": 200,
    "message": "Successfully fetched timeslots",
    "data": [
        {
            "timeslotID": 15,
            "subjectID": 15,
            "day": "Friday",
            "timeStart": "13:00:00",
            "timeEnd": "16:00:00"
        },
        {
            "timeslotID": 41,
            "subjectID": 41,
            "day": "Friday",
            "timeStart": "07:00:00",
            "timeEnd": "08:00:00"
        }
    ],
    "total": 2,
    "limit": 12,
    "page": 1,
    "pages": 1
 *  }
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
 * HTTP/1.1 404 Timeslots not found
 * {
 *   "status": 404,
 *   "message": "Timeslots not found"
 * }
 */

router.get('/timeslot/', async (req, res) => {
  try {
    const timeslots = await Ctrl.getTimeslots(req.query);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched timeslots',
      data: timeslots,
      total: (await Ctrl.getTotalTimeslots(req.query)).total,
      limit: parseInt(req.query.limit) || 12,
      page: parseInt(req.query.page) || 1,
      pages: Math.ceil(
        (await Ctrl.getTotalTimeslots(req.query)).total /
          (parseInt(req.query.limit) || 12),
      ),
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Timeslots not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {get} /timeslot/:timeslotID/ getTimeslot
 * @apiGroup Timeslot
 * @apiName getTimeslot
 *
 * @apiParam (Query Params) {Number} timeslotID ID of timeslot
 *
  *@apiSuccess {Object} timeslot timeslot fetched
 * @apiSuccess {Number} timeslot.timeslotID ID of timeslot
 * @apiSuccess {Number} timeslot.subjectID ID of subject 
 * @apiSuccess {String} timeslot.day day assigned to timeslot
 * @apiSuccess {Time} timeslot.timeStart starting time of timeslot
 * @apiSuccess {Time} timeslot.timeEnd dismissal time of timeslot
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *  {
    "status": 200,
    "message": "Successfully fetched timeslot",
    "data":
        {
            "timeslotID": 2,
            "subjectID": 2,
            "day": "Wednesday",
            "timeStart": "08:00:00",
            "timeEnd": "09:00:00"
        }
   
   }
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
 * HTTP/1.1 404 Timeslot not found
 * {
 *   "status": 404,
 *   "message": "Timeslot not found"
 * }
 */

router.get('/timeslot/:timeslotID/', async (req, res) => {
  try {
    const timeslot = await Ctrl.getTimeslot(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched timeslot',
      data: timeslot,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Timeslot not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {put} /timeslot/:timeslotID updateTimeslot
 * @apiGroup Timeslot
 * @apiName updateTimeslot
 *
 * @apiParam (Query Params) {Number} timeslotID ID of timeslot

 * @apiParam (Body Params) {Number} subjectID subject ID of subject
 * @apiParam (Body Params) {String} day day assigned to timeslot
 * @apiParam (Body Params) {Time} timeStart starting time of timeslot
 * @apiParam (Body Params) {Time} timeEnd dismissal time of timeslot
 *
 * @apiSuccess {Object} timeslot timeslot updated
 * @apiSuccess {Number} timeslot.timeslotID ID of timeslot
 * @apiSuccess {Number} timeslot.subjectID ID of subject 
 * @apiSuccess {String} timeslot.day day assigned to timeslot
 * @apiSuccess {Time} timeslot.timeStart starting time of timeslot
 * @apiSuccess {Time} timeslot.timeEnd dismissal time of timeslot
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *  {
    "status": 200,
    "message": "Successfully updated timeslot",
    "data": 
        {
            "timeslotID": 2,
            "subjectID": 1,
            "day": "YO",
            "timeStart": "10:00:00",
            "timeEnd": "11:00:00"
        }
    
    }
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
 * HTTP/1.1 404 Timeslot not found
 * {
 *   "status": 404,
 *   "message": "Timeslot not found"
 * }
 */

router.put('/timeslot/:timeslotID/', async (req, res) => {
  try {
    await Ctrl.updateTimeslot(req.params, req.body);
    const timeslot = await Ctrl.getTimeslot(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully updated timeslot',
      data: timeslot,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Timeslot not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {delete} /timeslot/:timeslotID deleteTimeslot
 * @apiGroup Timeslot
 * @apiName deleteTimeslot
 *
 * @apiParam (Query Params) {Number} timeslotID ID of timeslot
 *
 * @apiSuccess {Object} timeslot subject deleted
 * @apiSuccess {Number} timeslot.timeslotID ID of timeslot
 * @apiSuccess {Number} timeslot.subjectID ID of subject 
 * @apiSuccess {String} timeslot.day day assigned to timeslot
 * @apiSuccess {Time} timeslot.timeStart starting time of timeslot
 * @apiSuccess {Time} timeslot.timeEnd dismissal time of timeslot 
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
    "status": 200,
    "message": "Successfully deleted timeslot",
    "data": 
        {
            "timeslotID": 2,
            "subjectID": 1,
            "day": "YO",
            "timeStart": "10:00:00",
            "timeEnd": "11:00:00"
        }
    
    }
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
 * HTTP/1.1 404 Timeslot not found
 * {
 *   "status": 404,
 *   "message": "Timeslot not found"
 * }
 */
router.delete('/timeslot/:timeslotID/', async (req, res) => {
  try {
    const timeslot = await Ctrl.getTimeslot(req.params);
    await Ctrl.deleteTimeslot(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully deleted timeslot',
      data: timeslot,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Timeslot not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

export default router;
