import { Router } from 'express';
import * as Ctrl from './controller';

const router = Router();

/**
 * @api {post} /consultationHours addConsultationHour
 * @apiGroup ConsultationHours
 * @apiName addConsultationHour
 *
 * @apiParam (Body Params) {Number} chID chID of consultationHour
 * @apiParam (Body Params) {Number} id ID of FSR
 * @apiParam (Body Params) {String} place place of consultationHour
 * @apiParam (Body Params) {String} day day of consultationHour
 * @apiParam (Body Params) {Time} timeStart timeStart of consultationHour
 * @apiParam (Body Params) {Time} timeEnd timeEnd of consultationHour
 *
 * @apiSuccess {Object} consultationHour new Consultation Hour
 * @apiSuccess {Number} consultationHour.chID chID of consultationHour
 * @apiSuccess {Number} consultationHour.id ID of FSR
 * @apiSuccess {String} consultationHour.place place of consultationHour
 * @apiSuccess {String} consultationHour.day day of consultationHour
 * @apiSuccess {Time} consultationHour.timeStart timeStart of consultationHour
 * @apiSuccess {Time} consultationHour.timeEnd timeEnd of consultationHour
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *  {
 *      "status": 200,
 *      "message": "Successfully created consultation hours details",
 *      "data":
 *          {
 *              "chID": 1,
 *              "id": 1,
 *              "place": "C-118",
 *              "day": "Monday",
 *              "timeStart": "11:00:00",
 *              "timeEnd": "12:00:00"
 *          }
 *  }
 *
 * @apiError (Error 500) {String} status status code
 * @apiError (Error 500) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 */

router.post('/consultationHours/', async (req, res) => {
  try {
    const chID = await Ctrl.addConsultationHour(req.body);
    const consultationHour = await Ctrl.getConsultationHour({ chID });
    res.status(200).json({
      status: 200,
      message: 'Successfully created consultation hours details',
      data: consultationHour,
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
 * @api {put} /consultationHours/:chID updateConsultationHour
 * @apiGroup ConsultationHours
 * @apiName updateConsultationHour
 *
 * @apiParam (Query Params) {Number} chID chID of consultationHour
 * @apiParam (Body Params) {Number} id ID of FSR
 * @apiParam (Body Params) {String} place place of consultationHour
 * @apiParam (Body Params) {String} day day of consultationHour
 * @apiParam (Body Params) {Time} timeStart timeStart of consultationHour
 * @apiParam (Body Params) {Time} timeEnd timeEnd of consultationHour
 *
 * @apiSuccess {Object} consultationHour Consultation Hour updated
 * @apiSuccess {Number} consultationHour.chID chID of consultationHour
 * @apiSuccess {Number} consultationHour.id ID of FSR
 * @apiSuccess {String} consultationHour.place place of consultationHour
 * @apiSuccess {String} consultationHour.day day of consultationHour
 * @apiSuccess {Time} consultationHour.timeStart timeStart of consultationHour
 * @apiSuccess {Time} consultationHour.timeEnd timeEnd of consultationHour
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *  {
 *      "status": 200,
 *      "message": "Successfully updated consultation hours details",
 *      "data":
 *          {
 *              "chID": 1,
 *              "id": 1,
 *              "place": "C-118",
 *              "day": "Monday",
 *              "timeStart": "11:00:00",
 *              "timeEnd": "12:00:00"
 *          }
 *  }
 *
 * @apiError (Error 404) {String} status status code
 * @apiError (Error 404) {String} message Error message
 * HTTP/1.1 404 Consultation Hour not found
 * {
 *   "status": 404,
 *   "message": "Consultation hours details not found"
 * }
 * @apiError (Error 500) {String} status status code
 * @apiError (Error 500) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 */

router.put('/consultationHours/:chID', async (req, res) => {
  try {
    await Ctrl.updateConsultationHour(req.params, req.body);
    const consultationHour = await Ctrl.getConsultationHour(req.params);

    res.status(200).json({
      status: 200,
      message: 'Successfully updated consultation hours details',
      data: consultationHour,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Consultation hours details not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {delete} /consultationHours/:chID deleteConsultationHour
 * @apiGroup ConsultationHours
 * @apiName deleteConsultationHour
 *
 * @apiParam (Query Params) {Number} chID chID of consultationHour
 *
 * @apiSuccess {Object} consultationHour Consultation Hour deleted
 * @apiSuccess {Number} consultationHour.chID chID of consultationHour
 * @apiSuccess {Number} consultationHour.id ID of FSR
 * @apiSuccess {String} consultationHour.place place of consultationHour
 * @apiSuccess {String} consultationHour.day day of consultationHour
 * @apiSuccess {Time} consultationHour.timeStart timeStart of consultationHour
 * @apiSuccess {Time} consultationHour.timeEnd timeEnd of consultationHour
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *  {
 *      "status": 200,
 *      "message": "Successfully deleted consultation hours details",
 *      "data":
 *          {
 *              "chID": 1,
 *              "id": 1,
 *              "place": "C-118",
 *              "day": "Monday",
 *              "timeStart": "11:00:00",
 *              "timeEnd": "12:00:00"
 *          }
 *  }
 *
 * @apiError (Error 404) {String} status status code
 * @apiError (Error 404) {String} message Error message
 * HTTP/1.1 404 Consultation Hour not found
 * {
 *   "status": 404,
 *   "message": "Consultation hours details not found"
 * }
 * @apiError (Error 500) {String} status status code
 * @apiError (Error 500) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 */

router.delete('/consultationHours/:chID', async (req, res) => {
  try {
    const consultationHour = await Ctrl.getConsultationHour(req.params);
    await Ctrl.deleteConsultationHour(req.params);

    res.status(200).json({
      status: 200,
      message: 'Successfully deleted consultation hours details',
      data: consultationHour,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Consultation hours details not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {get} /consultationHours/:chID getConsultationHour
 * @apiGroup ConsultationHours
 * @apiName getConsultationHour
 *
 * @apiParam (Query Params) {Number} chID chID of consultationHour
 *
 * @apiSuccess {Object} consultationHour Consulatation Hour fetched
 * @apiSuccess {Number} consultationHour.chID chID of consultationHour
 * @apiSuccess {Number} consultationHour.id ID of FSR
 * @apiSuccess {String} consultationHour.place place of consultationHour
 * @apiSuccess {String} consultationHour.day day of consultationHour
 * @apiSuccess {Time} consultationHour.timeStart timeStart of consultationHour
 * @apiSuccess {Time} consultationHour.timeEnd timeEnd of consultationHour
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *  {
 *      "status": 200,
 *      "message": "Successfully fetched consultation hours details",
 *      "data":
 *          {
 *              "chID": 1,
 *              "id": 1,
 *              "place": "C-118",
 *              "day": "Monday",
 *              "timeStart": "11:00:00",
 *              "timeEnd": "12:00:00"
 *          }
 *  }
 *
 * @apiError (Error 404) {String} status status code
 * @apiError (Error 404) {String} message Error message
 * HTTP/1.1 404 Consultation Hour not found
 * {
 *   "status": 404,
 *   "message": "Consultation hours details not found"
 * }
 * @apiError (Error 500) {String} status status code
 * @apiError (Error 500) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 */

router.get('/consultationHours/:chID', async (req, res) => {
  try {
    const consultationHour = await Ctrl.getConsultationHour(req.params);

    res.status(200).json({
      status: 200,
      message: 'Successfully fetched consultation hours details',
      data: consultationHour,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Consultation hours details not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {get} /consultationHours/ getConsultationHours
 * @apiGroup ConsultationHours
 * @apiName getConsultationHours
 *
 * @apiParam (Query Params) {String} [place] chair grant title of award
 * @apiParam (Query Params) {String} [day] professional chair of award
 * @apiParam (Query Params) {Time} [timeStart] approved start date of award
 * @apiParam (Query Params) {Time} [timeEnd] end date of award
 * @apiParam (Query Params) {Number} [page] page number
 * @apiParam (Query Params) {Number} [limit] count limit of consultationHours to fetch
 * @apiParam (Query Params) {String} [sortBy] sort data by 'ASC' or 'DESC'
 * @apiParam (Query Params) {String} [field] order data depending on this field. Default value is 'place'
 *
 * @apiSuccess {Object} consultationHour consulatationHours fetched
 * @apiSuccess {Number} consultationHour.chID chID of consultationHour
 * @apiSuccess {Number} consultationHour.id ID of FSR
 * @apiSuccess {String} consultationHour.place place of consultationHours
 * @apiSuccess {String} consultationHour.day day of consultationHours
 * @apiSuccess {Time} consultationHour.timeStart timeStart of consultationHours
 * @apiSuccess {Time} consultationHour.timeEnd timeEnd of consultationHours
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *  {
 *      "status": 200,
 *      "message": "Successfully fetched consultation hours details",
 *      "data":
 *          {
 *              "chID": 1,
 *              "id": 1,
 *              "place": "C-118",
 *              "day": "Monday",
 *              "timeStart": "11:00:00",
 *              "timeEnd": "12:00:00"
 *          },
 *          {
 *              "chID": 2,
 *              "id": 2,
 *              "place": "C-117",
 *              "day": "Tuesday",
 *              "timeStart": "01:00:00",
 *              "timeEnd": "02:00:00"
 *          },
 *  }
 *
 * @apiError (Error 404) {String} status status code
 * @apiError (Error 404) {String} message Error message
 * HTTP/1.1 404 ConsultationHours not found
 * {
 *   "status": 404,
 *   "message": "Consultation hours details not found"
 * }
 * @apiError (Error 500) {String} status status code
 * @apiError (Error 500) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 */

router.get('/consultationHours/', async (req, res) => {
  try {
    const consultationHours = await Ctrl.getConsultationHours(req.query);

    res.status(200).json({
      status: 200,
      message: 'Successfully fetched consultation hours details',
      data: consultationHours,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Consultation hours details not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

export default router;
