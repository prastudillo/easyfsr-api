import { Router } from 'express';
import bcrypt from 'bcrypt';
import * as Ctrl from './controller';

const router = Router();

/**
 * @api {post} /service addExtensionAndCommunityService
 * @apiGroup ExtensionAndCommunityService
 * @apiName addExtensionAndCommunityService
 *
 * @apiParam (Body Params) {String} id of service
 * @apiParam (Body Params) {String} participant
 * @apiParam (Body Params) {String} role
 * @apiParam (Body Params) {Integer} hours
 * @apiParam (Body Params) {String} title
 * @apiParam (Body Params) {Integer} creditUnit of service
 * @apiParam (Body Params) {String} type of service
 * @apiParam (Body Params) {String} startdate of service
 * @apiParam (Body Params) {String} enddateof service
 *
 * @apiParam {String} service.id id of service
 * @apiParam {String} service.participant participant
 * @apiParam {String} service.role role
 * @apiParam {Integer} service.hours hours of service
 * @apiParam {String} service.title title of service
 * @apiParam {Integer} service.creditUnit creditUnit of service
 * @apiParam {String} service.type type of service
 * @apiParam {String} service.startdate startdate of service
 * @apiParam {String} service.enddate enddate of service
 * @apiSuccess {Object} service new service created
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *  {
 *   "status": 200,
 *   "message": "Successfully created service",
 *   "data": [
 *       {
 *           "id": 1,
 *           "extAndCommServiceID": 3,
 *           "participant": "12",
 *           "role": "registration",
 *           "hours": 5,
 *           "title": "Fair",
 *           "creditUnit": 3,
 *           "type": "fair",
 *           "startDate": "2018-09-09",
 *           "endDate": "2018-09-11"
 *       }
 *   ]
 * }
 *
 * @apiError (Error 500) {String[]} errors List of errors
 * @apiError (Error 500) {String} errors.message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 */

router.post('/service/', async (req, res) => {
  try {
    const extAndCommServiceID = await Ctrl.addExtensionAndCommunityService(
      req.body,
    );
    const service = await Ctrl.getExtensionAndCommunityService({
      extAndCommServiceID,
    });
    res.status(200).json({
      status: 200,
      message: 'Successfully created service',
      data: service,
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
 * @api {put} /service updateExtensionAndCommunityService
 * @apiGroup ExtensionAndCommunityService
 * @apiName updateExtensionAndCommunityService
 *
 * @apiParam (Body Params) {String} id of service
 * @apiParam (Body Params) {String} participant
 * @apiParam (Body Params) {String} role
 * @apiParam (Body Params) {Integer} hours
 * @apiParam (Body Params) {String} title
 * @apiParam (Body Params) {Integer} creditUnit of service
 * @apiParam (Body Params) {String} type of service
 * @apiParam (Body Params) {String} startdate of service
 * @apiParam (Body Params) {String} enddateof service
 *
 * @apiParam {String} service.id id of service
 * @apiParam {String} service.participant participant
 * @apiParam {String} service.role role
 * @apiParam {Integer} service.hours hours of service
 * @apiParam {String} service.title title of service
 * @apiParam {Integer} service.creditUnit creditUnit of service
 * @apiParam {String} service.type type of service
 * @apiParam {String} service.startdate startdate of service
 * @apiParam {String} service.enddate enddate of service
 * @apiSuccess {Object} service new service created
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *  {
 *    "status": 200,
 *    "message": "Successfully updated service",
 *    "data": [
 *      {
 *        "id": 1,
 *        "extAndCommServiceID": 1,
 *        "participant": "ren",
 *        "role": "wala",
 *        "hours": 3,
 *        "title": "tulog",
 *        "creditUnit": 1,
 *        "type": "rest",
 *        "startDate": "010118",
 *        "endDate": "123118"
 *      }
 *    ]
 *  }
 *
 * @apiError (Error 500) {String[]} errors List of errors
 * @apiError (Error 500) {String} errors.message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 */

router.put('/service/:extAndCommServiceID/', async (req, res) => {
  try {
    await Ctrl.updateExtensionAndCommunityService(req.params, req.body);
    const service = await Ctrl.getExtensionAndCommunityService(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully updated service',
      data: service,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Service not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

router.get('/service', async (req, res) => {
  try {
    const services = await Ctrl.getExtensionAndCommunityServices(req.query);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched services',
      data: services,
      total: services.length,
      limit: req.query.limit || 10,
      page: req.query.page || 1,
      pages: Math.ceil(services.length / (req.query.limit || 10)),
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Extension and community services not found';
        break;
      case 500:
        a;
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {delete} /service deleteExtensionAndCommunityService
 * @apiGroup ExtensionAndCommunityService
 * @apiName deleteExtensionAndCommunityService
 *
 * @apiParam (Body Params) {String} id of service
 * @apiParam (Body Params) {String} participant
 * @apiParam (Body Params) {String} role
 * @apiParam (Body Params) {Integer} hours
 * @apiParam (Body Params) {String} title
 * @apiParam (Body Params) {Integer} creditUnit of service
 * @apiParam (Body Params) {String} type of service
 * @apiParam (Body Params) {String} startdate of service
 * @apiParam (Body Params) {String} enddateof service
 *
 * @apiParam {String} service.id id of service
 * @apiParam {String} service.participant participant
 * @apiParam {String} service.role role
 * @apiParam {Integer} service.hours hours of service
 * @apiParam {String} service.title title of service
 * @apiParam {Integer} service.creditUnit creditUnit of service
 * @apiParam {String} service.type type of service
 * @apiParam {String} service.startdate startdate of service
 * @apiParam {String} service.enddate enddate of service
 * @apiSuccess {Object} service new service created
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *  {
 *   "status": 200,
 *   "message": "Successfully deleted service"
 *  }
 *
 * @apiError (Error 500) {String[]} errors List of errors
 * @apiError (Error 500) {String} errors.message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 **/

router.delete('/service/:extAndCommServiceID/', async (req, res) => {
  try {
    await Ctrl.deleteExtensionAndCommunityService(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully deleted service',
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'ExtensionAndCommunityService not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {get} /service getExtensionAndCommunityService
 * @apiGroup ExtensionAndCommunityService
 * @apiName getExtensionAndCommunityService
 *
 * @apiParam (Body Params) {String} id of service
 * @apiParam (Body Params) {String} participant
 * @apiParam (Body Params) {String} role
 * @apiParam (Body Params) {Integer} hours
 * @apiParam (Body Params) {String} title
 * @apiParam (Body Params) {Integer} creditUnit of service
 * @apiParam (Body Params) {String} type of service
 * @apiParam (Body Params) {String} startdate of service
 * @apiParam (Body Params) {String} enddateof service
 *
 * @apiParam {String} service.id id of service
 * @apiParam {String} service.participant participant
 * @apiParam {String} service.role role
 * @apiParam {Integer} service.hours hours of service
 * @apiParam {String} service.title title of service
 * @apiParam {Integer} service.creditUnit creditUnit of service
 * @apiParam {String} service.type type of service
 * @apiParam {String} service.startdate startdate of service
 * @apiParam {String} service.enddate enddate of service
 * @apiSuccess {Object} service new service created
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *  {
 *   "status": 200,
 *   "message": "Successfully fetched service".
 *   "data": [{
 *       "id": 1,
 *       "extAndCommServiceID": 1,
 *       "participant": "ren",
 *       "role": "wala",
 *       "hours": 3,
 *       "title": "tulog",
 *       "creditUnit": 1,
 *       "type": "rest",
 *       "startDate": "010118",
 *       "endDate": "123118"
 *    }]
 *  }
 *
 * @apiError (Error 500) {String[]} errors List of errors
 * @apiError (Error 500) {String} errors.message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 **/

router.get('/service/:extAndCommServiceID/', async (req, res) => {
  try {
    const service = await Ctrl.getExtensionAndCommunityService(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched service',
      data: service,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Service not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

export default router;
