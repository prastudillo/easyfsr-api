import { Router } from 'express';
import bcrypt from 'bcrypt';
import * as Ctrl from './controller';

const router = Router();

/**
 * @api {post} /research addResearch
 * @apiGroup Research
 * @apiName addResearch
 *
 * @apiParam (Body Params) {String} id of fsr
 * @apiParam (Body Params) {String} researchID ID of research
 * @apiParam (Body Params) {String} type type of research
 * @apiParam (Body Params) {String} role role of research
 * @apiParam (Body Params) {String} title title of research
 * @apiParam (Body Params) {String} startDate start date of research
 * @apiParam (Body Params) {String} endDate end date of research
 * @apiParam (Body Params) {String} funding funding of research
 * @apiParam (Body Params) {String} approvedUnits approved units of research
 *
 * @apiSuccess {Object} research Successfully added research
 * @apiSuccess {String} research.researchID ID of research
 * @apiSuccess {String} research.type type of research
 * @apiSuccess {String} research.role role of research
 * @apiSuccess {String} research.title title of research
 * @apiSuccess {String} research.startDate start date of research
 * @apiSuccess {String} research.endDate end date of research
 * @apiSuccess {String} research.funding funding of research
 * @apiSuccess {String} research.approvedUnits approved units of research
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "status": 200,
 *     "message": "Successfully created research",
 *     "data": [
 *         {
 *           "id": 1,
 *           "researchID": 92,
 *           "type": "annyeonglol",
 *           "role": "role1",
 *           "title": "title",
 *           "startDate": "2013-01-31T16:00:00.000Z",
 *           "endDate": "2015-01-31T16:00:00.000Z",
 *           "funding": "fund",
 *           "approvedUnits": "20"
 *         }
 *     ]
 *   }
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

router.post('/research/', async (req, res) => {
  try {
    const researchID = await Ctrl.addResearch(req.body);

    const research = await Ctrl.getResearch({ researchID });
    console.log(req.body.researchID);
    console.log(research);
    res.status(200).json({
      status: 200,
      message: 'Successfully created research',
      data: research,
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
 * @api {put} /research/:researchID updateResearch
 * @apiGroup Research
 * @apiName updateResearch
 *
 * @apiParam (Query Params) {String} id of fsr
 * @apiParam (Body Params) {String} researchID ID of research
 * @apiParam (Body Params) {String} type type of research
 * @apiParam (Body Params) {String} role role of research
 * @apiParam (Body Params) {String} title title of research
 * @apiParam (Body Params) {String} startDate start date of research
 * @apiParam (Body Params) {String} endDate end date of research
 * @apiParam (Body Params) {String} funding funding of research
 * @apiParam (Body Params) {String} approvedUnits approved units of research
 *
 * @apiSuccess {Object} research Successfully updated research
 * @apiSuccess {String} research.researchID ID of research
 * @apiSuccess {String} research.type type of research
 * @apiSuccess {String} research.role role of research
 * @apiSuccess {String} research.title title of research
 * @apiSuccess {String} research.startDate start date of research
 * @apiSuccess {String} research.endDate end date of research
 * @apiSuccess {String} research.funding funding of research
 * @apiSuccess {String} research.approvedUnits approved units of research
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *      "status": 200,
 *      "message": "Successfully updated research",
 *      "data": [
 *       {
 *           "id": 1,
 *           "researchID": 17,
 *           "type": "annyeonglol",
 *           "role": "role1",
 *           "title": "title",
 *           "startDate": "2013-01-31T16:00:00.000Z",
 *           "endDate": "2015-01-31T16:00:00.000Z",
 *           "funding": "fund",
 *           "approvedUnits": "20"
 *       }
 *      ]
 *   }
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

router.put('/research/:researchID', async (req, res) => {
  try {
    await Ctrl.updateResearch(req.params, req.body);
    const research = await Ctrl.getResearch(req.params);

    res.status(200).json({
      status: 200,
      message: 'Successfully updated research',
      data: research,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Research not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {delete} /research/:researchID deleteResearch
 * @apiGroup Research
 * @apiName deleteResearch
 *
 * @apiParam (Query Params) {String} id of fsr
 *
 * @apiSuccess {Object} research Successfully deleted research
 * @apiSuccess {String} research.researchID ID of research
 * @apiSuccess {String} research.type type of research
 * @apiSuccess {String} research.role role of research
 * @apiSuccess {String} research.title title of research
 * @apiSuccess {String} research.startDate start date of research
 * @apiSuccess {String} research.endDate end date of research
 * @apiSuccess {String} research.funding funding of research
 * @apiSuccess {String} research.approvedUnits approved units of research
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *      "status": 200,
 *      "message": "Successfully deleted research",
 *       "data": [
 *       {
 *           "id": 13,
 *           "researchID": 13,
 *           "type": "Implementation",
 *           "role": "Sample Role",
 *           "title": "Sample Title",
 *           "startDate": "2017-11-01T16:00:00.000Z",
 *           "endDate": null,
 *           "funding": "Sample Funding",
 *           "approvedUnits": "5"
 *       }
 *     ]
 *   }
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

router.delete('/research/:researchID', async (req, res) => {
  try {
    const research = await Ctrl.getResearch(req.params);
    await Ctrl.deleteResearch(req.body);
    res.status(200).json({
      status: 200,
      message: 'Successfully deleted research',
      data: research,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Research not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {get} /research/:researchID getResearch
 * @apiGroup Research
 * @apiName getResearch
 *
 * @apiParam (Query Params) {String} id of fsr
 *
 * @apiSuccess {Object} research Successfully fetched research
 * @apiSuccess {String} research.researchID ID of research
 * @apiSuccess {String} research.type type of research
 * @apiSuccess {String} research.role role of research
 * @apiSuccess {String} research.title title of research
 * @apiSuccess {Date} research.startDate start date of research
 * @apiSuccess {Date} research.endDate end date of research
 * @apiSuccess {String} research.funding funding of research
 * @apiSuccess {String} research.approvedUnits approved units of research
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *   "status": 200,
 *   "message": "Successfully fetched researches",
 *   "data": [
 *       {
 *           "id": 1,
 *           "researchID": 1,
 *           "type": "Implementation",
 *           "role": "Sample Role",
 *           "title": "Sample Title",
 *           "startDate": "2017-10-20T16:00:00.000Z",
 *           "endDate": null,
 *           "funding": "Sample Funding",
 *           "approvedUnits": "6"
 *       }
 *    ]
 *   }
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

router.get('/research/:researchID', async (req, res) => {
  try {
    const research = await Ctrl.getResearch(req.params);
    console.log(research);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched research',
      data: research,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Research not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
    return research;
  }
});

/**
 * @api {get} /research getResearches
 * @apiGroup Research
 * @apiName getResearches
 *
 * @apiParam (Query Params) {String} [id] of fsr
 * @apiParam (Query Params) {String} [researchID] ID of research
 * @apiParam (Query Params) {String} [type] type of research
 * @apiParam (Query Params) {String} [role] role of research
 * @apiParam (Query Params) {String} [title] title of research
 * @apiParam (Query Params) {Date} [startDate] start date of research
 * @apiParam (Query Params) {Date} [endDate] end date of research
 * @apiParam (Query Params) {String} [funding] funding of research
 * @apiParam (Query Params) {String} [approvedUnits] approved units of research
 * @apiParam (Query Params) {Number} [limit] count limit of researches to fetch
 * @apiParam (Query Params) {String} [sortBy] sort data by 'ASC' or 'DESC'
 * @apiParam (Query Params) {String} [field] order data depending on this field. Default value is 'type'
 *
 *
 * @apiSuccess {Object} research Successfully fetched researches
 * @apiSuccess {String} research.researchID ID of research
 * @apiSuccess {String} research.type type of research
 * @apiSuccess {String} research.role role of research
 * @apiSuccess {String} research.title title of research
 * @apiSuccess {Date} research.startDate start date of research
 * @apiSuccess {Date} research.endDate end date of research
 * @apiSuccess {String} research.funding funding of research
 * @apiSuccess {String} research.approvedUnits approved units of research
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *   "status": 200,
 *   "message": "Successfully fetched researches",
 *   "data": [
 *       {
 *           "id": 1,
 *           "researchID": 1,
 *           "type": "Implementation",
 *           "role": "Sample Role",
 *           "title": "Sample Title",
 *           "startDate": "2017-10-20T16:00:00.000Z",
 *           "endDate": null,
 *           "funding": "Sample Funding",
 *           "approvedUnits": "6"
 *       },
 *       {
 *           "id": 27,
 *           "researchID": 27,
 *           "type": "Implementation",
 *           "role": "Sample Role",
 *           "title": "Sample Title",
 *           "startDate": "2017-12-02T16:00:00.000Z",
 *           "endDate": null,
 *           "funding": "Sample Funding",
 *           "approvedUnits": "4"
 *       }
 *    ],
 *     "total": 2,
 *     "limit": 12,
 *     "page": 1,
 *     "pages": 1
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

router.get('/research/', async (req, res) => {
  try {
    const researches = await Ctrl.getResearches(req.query);

    res.status(200).json({
      status: 200,
      message: 'Successfully fetched researches',
      data: researches,
      total: (await Ctrl.getTotalResearches(req.query)).total,
      limit: parseInt(req.query.limit) || 12,
      page: parseInt(req.query.page) || 1,
      pages: Math.ceil(
        (await Ctrl.getTotalResearches(req.query)).total /
          (parseInt(req.query.limit) || 12),
      ),
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Research/es not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

export default router;
