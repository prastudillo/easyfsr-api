import { Router } from 'express';
import bcrypt from 'bcrypt';
import * as Ctrl from './controller';

const router = Router();

/**
 * @api {post} /adminWork addAdminWork
 * @apiGroup AdminWork
 * @apiName addAdminWork
 *
 * @apiParam (Body Params) {Number} adminWorkID ID of admin work
 * @apiParam (Body Params) {Number} id ID of fsr
 * @apiParam (Body Params) {String} position position of admin work
 * @apiParam (Body Params) {String} officeUnit office unit of admin work
 * @apiParam (Body Params) {String} approvedUnits approved units of admin work
 *
 * @apiSuccess {Object} adminWork new AdminWork is added
 * @apiSuccess {Number} adminWork.adminWorkID ID of admin work
 * @apiSuccess {Number} adminWork.id ID of FSR
 * @apiSuccess {String} adminWork.position position of admin work
 * @apiSuccess {String} adminWork.officeUnit office unit of admin work
 * @apiSuccess {String} adminWork.approvedUnits approved units of admin work
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *  		"status": 200;
 *			"message": 'Succesfully created adminWork'
 *       "data":
 *        {
 *             "adminWorkID": 93,
 *             "position": "admin",
 *             "officeUnit": "ics",
 *             "approvedUnits": 6,
 *             "id": 1
 *         }
 *	  }
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

router.post('/adminWork/', async (req, res) => {
  try {
    const adminWorkID = await Ctrl.addAdminWork(req.body);
    const adminWork = await Ctrl.getAdminWork({ adminWorkID });
    res.status(200).json({
      status: 200,
      message: 'Successfully created adminWork',
      data: adminWork,
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
 * @api {put} /adminWork/:adminWorkID updateAdminWork
 * @apiGroup AdminWork
 * @apiName updateAdminWork
 *
 * @apiParam (Query Params) {Number} adminWordkID ID of admin work
 *
 * @apiParam (Body Params) {Number} [id] ID of FSR
 * @apiParam (Body Params) {String} [position] position of admin work
 * @apiParam (Body Params) {String} [officeUnit] office unit of admin work
 * @apiParam (Body Params) {String} [approvedUnits] approved units of admin work
 *
 * @apiSuccess {Object} adminWork adminWork updated
 * @apiSuccess {Number} adminWork.adminWorkID ID of admin work
 * @apiSuccess {Number} adminWork.id ID of FSR
 * @apiSuccess {String} adminWork.position position of admin work
 * @apiSuccess {String} adminWork.officeUnit office unit of admin work
 * @apiSuccess {String} adminWork.approvedUnits approved units of admin work
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *	 {
 *   		"status": 200,
 *   		"message": "Successfully updated adminWork",
 *   		"data":
 *           {
 *             "adminWorkID": 93,
 *             "position": "admin aide",
 *             "officeUnit": "ics",
 *             "approvedUnits": 3,
 *             "id": 1
 *           }
 *
 *	 }
 *
 * @apiError (Error 500) {String} status error status code
 * @apiError (Error 500) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 *   HTTP/1.1 404 adminWork not found
 * 	 {
 *   	"status": 404,
 *   	"message": "adminWork not found"
 *   }
 */

router.put('/adminWork/:adminWorkID', async (req, res) => {
  try {
    await Ctrl.updateAdminWork(req.params, req.body);
    const adminWork = await Ctrl.getAdminWork(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully updated admin work',
      data: adminWork,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'adminWork not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {delete} /adminWork/:adminWorkID deleteAdminWork
 * @apiGroup AdminWork
 * @apiName deleteAdminWork
 *
 * @apiParam (Query Params) {Number} adminWordkID ID of admin work
 *
 * @apiSuccess {Object} adminWork new AdminWork deleted
 * @apiSuccess {Number} adminWork.adminWorkID ID of admin work
 * @apiSuccess {Number} adminWork.id ID of FSR
 * @apiSuccess {String} adminWork.position position of admin work
 * @apiSuccess {String} adminWork.officeUnit office unit of admin work
 * @apiSuccess {String} adminWork.approvedUnits approved units of admin work
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *        "status": 200;
 *        "message": 'Succesfully deleted adminWork'
 *        "data":
 *           {
 *             "adminWorkID": 93,
 *             "position": "admin aide",
 *             "officeUnit": "ics",
 *             "approvedUnits": 3,
 *             "id": 1
 *           }
 *
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
 *   HTTP/1.1 404 adminWork not found
 * 	 {
 *   	"status": 404,
 *   	"message": "adminWork not found"
 *   }
 */

router.delete('/adminWork/:adminWorkID', async (req, res) => {
  try {
    const adminWork = await Ctrl.getAdminWork(req.params);
    await Ctrl.deleteAdminWork(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully deleted adminWork',
      data: adminWork,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'adminWork not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {get} /adminWork/:adminWorkID getAdminWork
 * @apiGroup AdminWork
 * @apiName getAdminWork
 *
 * @apiParam (Query Params) {Number} adminWorkID ID of admin work
 *
 * @apiSuccess {Object} adminWork adminWork fetched
 * @apiSuccess {Number} adminWork.id ID of admin work
 * @apiSuccess {Number} adminWork.id ID of FSR
 * @apiSuccess {String} adminWork.position position of admin work
 * @apiSuccess {String} adminWork.officeUnit office unit of admin work
 * @apiSuccess {String} adminWork.approvedUnits approved units of admin work
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "status": 200,
 *     "message": "Successfully fetched admin work",
 *     "data": {
 *      "adminWorkID": 2,
 *      "position": "Administrative Aide",
 *      "officeUnit": "Institute of Computer Science",
 *      "approvedUnits": 5,
 *      "id": 2
 *     }
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
 * HTTP/1.1 404 Admin Work not found
 * {
 *   "status": 404,
 *   "message": "Admin Work not found"
 * }
 */

router.get('/adminWork/:adminWorkID', async (req, res) => {
  try {
    const adminWork = await Ctrl.getAdminWork(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched adminWork',
      data: adminWork,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'adminWork not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {get} /adminWork getAdminWorks
 * @apiGroup AdminWork
 * @apiName getAdminWorks
 *
 * @apiParam (Query Params) {Number} [id] ID of FSR
 * @apiParam (Query Params) {String} [position] position of admin work
 * @apiParam (Query Params) {String} [officeUnit] office unit of admin work
 * @apiParam (Query Params) {String} [approvedUnits] approved units of admin work
 * @apiParam (Query Params) {Number} [page] page number
 * @apiParam (Query Params) {Number} [limit] count limit of admin works to fetch
 * @apiParam (Query Params) {String} [sortBy] sort data by 'ASC' or 'DESC'
 * @apiParam (Query Params) {String} [field] order data depending on this field. Default value is 'position'
 *
 * @apiSuccess {Object} adminWork admin works fetched
 * @apiSuccess {Number} adminWork.adminWorkID ID of admin work
 * @apiSuccess {Number} adminWork.id ID of FSR
 * @apiSuccess {String} adminWork.position position of admin work
 * @apiSuccess {String} adminWork.officeUnit office unit of admin work
 * @apiSuccess {String} adminWork.approvedUnits approved units of admin work
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "status": 200,
 *     "message": "Successfully fetched admin works",
 *     "data": [
 *				{
 *          	"adminWorkID": 1,
 *          	"position": "Position1",
 *          	"officeUnit": "office",
 *          	"approvedUnits": 17,
 *          	"id": 1
 *      		},
 *      		{
 *          	"adminWorkID": 4,
 *          	"position": "Position4",
 *          	"officeUnit": "office",
 *          	"approvedUnits": 12,
 *          	"id": 5
 *      		}
 *  		],
 *       "total": 90,
 *       "limit": 12,
 *       "page": 1,
 *       "pages": 8
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
 * HTTP/1.1 404 Admin Works not found
 * {
 *   "status": 404,
 *   "message": "Admin Works not found"
 * }
 */

router.get('/adminWork/', async (req, res) => {
  try {
    const adminWorks = await Ctrl.getAdminWorks(req.query);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched admin works',
      data: adminWorks,
      total: (await Ctrl.getTotalAdminWorks(req.query)).total,
      limit: parseInt(req.query.limit) || 12,
      page: parseInt(req.query.page) || 1,
      pages: Math.ceil(
        (await Ctrl.getTotalAdminWorks(req.query)).total /
          (parseInt(req.query.limit) || 12),
      ),
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Admin works not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

export default router;
