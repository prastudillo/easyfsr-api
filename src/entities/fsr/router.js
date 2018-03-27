import { Router } from 'express';
import bcrypt from 'bcrypt';
import * as Ctrl from './controller';

const router = Router();

/**
 * @api {post} /fsr addFSR
 * @apiGroup FSR
 * @apiName addFSR
 *
 * @apiParam (Body Params) {String} userID ID of user
 * @apiParam (Body Params) {String} acadYear academic year the fsr is filed
 * @apiParam (Body Params) {String} semester semester the fsr is filed
 *
 * @apiSuccess {Object} fsr new FSR created
 * @apiSuccess {String} fsr.id ID of FSR
 * @apiSuccess {String} fsr.userID ID of user
 * @apiSuccess {String} fsr.acadYear academic year the fsr is filed
 * @apiSuccess {String} fsr.semester semester the fsr is filed
 * @apiSuccess {String} fsr.isChecked indicates if fsr is approved or not
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "status": 200;
 *     "message": 'Succesfully created fsr'
 *     "data": {
 *         "id": 92,
 *         "userID": 1,
 *         "acadYear": "2018",
 *         "semester": "2",
 *         "isChecked": 0
 *      }
 *   }
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

router.post('/fsr/', async (req, res) => {
  try {
    const id = await Ctrl.addFSR(req.body);
    const fsr = await Ctrl.getFSR({ id });
    res.status(200).json({
      status: 200,
      message: 'Successfully created fsr',
      data: fsr,
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
 * @api {delete} /fsr/:id deleteFSR
 * @apiGroup FSR
 * @apiName deleteFSR
 *
 * @apiParam (Query Params) {String} id ID of FSR
 *
 * @apiSuccess {Object} fsr new FSR deleted
 * @apiSuccess {String} fsr.id ID of FSR
 * @apiSuccess {String} fsr.userID ID of user
 * @apiSuccess {String} fsr.acadYear academic year the fsr is filed
 * @apiSuccess {String} fsr.semester semester the fsr is filed
 * @apiSuccess {String} fsr.isChecked indicates if fsr is approved or not
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "status": 200;
 *     "message": 'Succesfully deleted fsr'
 *     "data": {
 *         "id": 92,
 *         "userID": 1,
 *         "acadYear": "2018",
 *         "semester": "2",
 *         "isChecked": 0
 *      }
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
 * @apiError (Error 404) {String} status status code
 * @apiError (Error 404) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 404 FSR not found
 * {
 *   "status": 404,
 *   "message": "FSR not found"
 * }
 */
router.delete('/fsr/:id', async (req, res) => {
  try {
    const fsr = await Ctrl.getFSR(req.params);
    await Ctrl.deleteFSR(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully deleted fsr',
      data: fsr,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'FSR not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {get} /fsr/:id getFSR
 * @apiGroup FSR
 * @apiName getFSR
 *
 * @apiParam (Query Params) {String} id ID of FSR
 *
 * @apiSuccess {Object} fsr new FSR created
 * @apiSuccess {String} fsr.id ID of FSR
 * @apiSuccess {String} fsr.userID ID of user
 * @apiSuccess {String} fsr.acadYear academic year the fsr is filed
 * @apiSuccess {String} fsr.semester semester the fsr is filed
 * @apiSuccess {String} fsr.isChecked indicates if fsr is approved or not
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "status": 200;
 *     "message": 'Succesfully fetched fsr'
 *     "data": {
 *         "id": 92,
 *         "userID": 1,
 *         "acadYear": "2018",
 *         "semester": "2",
 *         "isChecked": 0
 *      }
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
 * @apiError (Error 404) {String} status status code
 * @apiError (Error 404) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 404 FSR not found
 * {
 *   "status": 404,
 *   "message": "FSR not found"
 * }
 */
router.get('/fsr/:id', async (req, res) => {
  try {
    const fsr = await Ctrl.getFSR(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched fsr',
      data: fsr,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'FSR not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {get} /fsr getFSRs
 * @apiGroup FSR
 * @apiName getFSRs
 *
 * @apiSuccess {Object[]} fsrs new FSR created
 * @apiSuccess {String} fsrs.id ID of FSR
 * @apiSuccess {String} fsrs.userID ID of user
 * @apiSuccess {String} fsrs.acadYear academic year the fsr is filed
 * @apiSuccess {String} fsrs.semester semester the fsr is filed
 * @apiSuccess {String} fsrs.isChecked indicates if fsr is approved or not
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "status": 200;
 *     "message": 'Succesfully fetched FSRs'
 *     "data": [
 *        {
 *            "id": 1,
 *            "userID": 1,
 *            "acadYear": "2017-2018",
 *            "semester": "Second",
 *            "isChecked": 0
 *        },
 *        {
 *            "id": 2,
 *            "userID": 1,
 *            "acadYear": "2017-2018",
 *            "semester": "First",
 *            "isChecked": 0
 *        },
 *      ]
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
 * @apiError (Error 404) {String} status status code
 * @apiError (Error 404) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 404 User not found
 * {
 *   "status": 404,
 *   "message": "FSR not found"
 * }
 */

router.get('/fsr', async (req, res) => {
  try {
    const FSRs = await Ctrl.getFSRs(req.query);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched FSRs',
      data: FSRs,
      total: FSRs.length,
      limit: req.query.limit || 12,
      page: req.query.page || 1,
      pages: Math.ceil(
        (await Ctrl.getTotalFSRs()).total / (req.query.limit || 12),
      ),
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'FSR/s not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

router.use('/fsr/:userID', (req, res, next) => {
  const { user } = req.session;
  if (user.acctType === 'ADMIN' || user.userID == req.params.userID) {
    return next();
  }
  res.status(403).json({
    status: 403,
    message: 'Unauthorized access',
  });
});
/**
 * @api {put} /fsr/:id updateFSR
 * @apiGroup FSR
 * @apiName updateFSR
 *
 * @apiParam (Query Params) {String} id ID of FSR
 * 
 * @apiParam (Body Params) {String} userID ID of user
 * @apiParam (Body Params) {String} acadYear academic year the fsr is filed
 * @apiParam (Body Params) {String} semester semester the fsr is filed
  * @apiParam (Body Params) {String} isChecked indicates if fsr is approved or not

 * @apiSuccess {Object} fsr  FSR updated
 * @apiSuccess {String} fsr.id ID of FSR
 * @apiSuccess {String} fsr.userID ID of user
 * @apiSuccess {String} fsr.acadYear academic year the fsr is filed
 * @apiSuccess {String} fsr.semester semester the fsr is filed
 * @apiSuccess {String} fsr.isChecked indicates if fsr is approved or not
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "status": 200;
 *     "message": 'Succesfully updated fsr'
 *     "data": {
 *         "id": 92,
 *         "userID": 1,
 *         "acadYear": "2018",
 *         "semester": "2",
 *         "isChecked": 1
 *      }
 *   }
 *
 * @apiError (Error 500) {String} status  status code
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
 * HTTP/1.1 404 FSR not found
 * {
 *   "status": 404,
 *   "message": "FSR not found"
 * }
 */

router.put('/fsr/:id', async (req, res) => {
  try {
    await Ctrl.updateFSR(req.params, req.body);
    const fsr = await Ctrl.getFSR(req.params);

    res.status(200).json({
      status: 200,
      message: 'Successfully updated fsr',
      data: fsr,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'FSR not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

export default router;
