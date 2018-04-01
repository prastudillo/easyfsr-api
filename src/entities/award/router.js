import { Router } from 'express';
import bcrypt from 'bcrypt';
import * as Ctrl from './controller';

const router = Router();

/**
 * @api {post} /award addAward
 * @apiGroup Award
 * @apiName addAward
 *
 * @apiParam (Body Params) {Number} id ID of award
 * @apiParam (Body Params) {Number} awardID awardID of award
 * @apiParam (Body Params) {String} grantF grantF of award
 * @apiParam (Body Params) {String} chairGrantTitle chair grant title of award
 * @apiParam (Body Params) {String} collegeHasNominated which college has nominated the award
 * @apiParam (Body Params) {String} recipientOrNominee recipient or nominee of award
 * @apiParam (Body Params) {String} proffesionalChair professional chai of award
 * @apiParam (Body Params) {Date} approvedStartDate approved start date of award
 * @apiParam (Body Params) {Date} endDate end date of award
 *
 * @apiSuccess {Object} award new Award
 * @apiSuccess {Number} award.id ID of award
 * @apiSuccess {Number} award.awardID awardID of award
 * @apiSuccess {String} award.grantF grantf of award
 * @apiSuccess {String} award.chairGrantTitle chair grant title of award
 * @apiSuccess {String} award.collegeHasNominated which college has nominated the award
 * @apiSuccess {String} award.recipientOrNominee recipient or nominee of award
 * @apiSuccess {String} award.professionalChair professional chair of award
 * @apiSuccess {Date} award.approvedStartDate approved start date of award
 * @apiSuccess {Date} award.endDate end date of award
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *  {
 *     "status": 200,
 *     "message": "Successfully added award",
 *     "data":
 *        {
 *           "awardID": 4,
 *           "id": 3,
 *           "grantF": "Hi",
 *           "chairGrantTitle": "Meaee",
 *           "collegeHasNominated": "156",
 *           "recipientOrNominee": "Youuuu",
 *           "professionalChair": "her",
 *           "approvedStartDate": "1999-12-31T16:00:00.000Z",
 *           "endDate": "2000-12-31T16:00:00.000Z"
 *         }
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

router.post('/award/', async (req, res) => {
  try {
    const awardID = await Ctrl.addAward(req.body);
    const award = await Ctrl.getAward({ awardID });
    res.status(200).json({
      status: 200,
      message: 'Successfully created award',
      data: award,
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
 * @api {put} /award/:awardID updateAward
 * @apiGroup Award
 * @apiName updateAward
 *
 * @apiParam (Query Params) {Number} awardID awardID of award
 * @apiParam (Body Params) {Number} id ID of award
 * @apiParam (Body Params) {String} grantF grantF of award
 * @apiParam (Body Params) {String} chairGrantTitle chair grant title of award
 * @apiParam (Body Params) {String} collegeHasNominated which college nominated the award
 * @apiParam (Body Params) {String} recipientOrNominee recipient or nominee of award
 * @apiParam (Body Params) {String} proffesionalChair professional chair of award
 * @apiParam (Body Params) {Date} approvedStartDate approved start date of award
 * @apiParam (Body Params) {Date} endDate end date of award
 *
 * @apiSuccess {Object} award Award updated
 * @apiSuccess {Number} award.id ID of award
 * @apiSuccess {String} award.grantF grantf of award
 * @apiSuccess {String} award.chairGrantTitle chair grant title of award
 * @apiSuccess {String} award.collegeHasNominated which college nominated the award
 * @apiSuccess {String} award.recipientOrNominee recipient or nominee of award
 * @apiSuccess {String} award.professionalChair professional chair of award
 * @apiSuccess {Date} award.approvedStartDate approved start date of award
 * @apiSuccess {Date} award.endDate end date of award
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *    "status": 200,
 *    "message": "Successfully updated award",
 *    "data":
 *        {
 *            "awardID": 4,
 *            "id": 3,
 *            "grantF": "Hlloasdsad",
 *            "chairGrantTitle": "Mea123123",
 *            "collegeHasNominated": "hl1445",
 *            "recipientOrNominee": "You456",
 *            "professionalChair": "him334",
 *            "approvedStartDate": "1999-12-31T16:00:00.000Z",
 *            "endDate": "2000-12-31T16:00:00.000Z"
 *        }
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
 * @apiError (Error 404) {String} status status code
 * @apiError (Error 404) {String} message Error message
 * HTTP/1.1 404 Award not found
 * {
 *   "status": 404,
 *   "message": "Award not found"
 * }
 */

router.put('/award/:awardID', async (req, res) => {
  try {
    await Ctrl.updateAward(req.params, req.body);
    const award = await Ctrl.getAward(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully updated award',
      data: award,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Award not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {delete} /award/:awardID deleteAward
 * @apiGroup Award
 * @apiName deleteAward
 *
 * @apiParam (Query Params) {Number} awardID ID of award
 *
 * @apiSuccess {Object} award Award deleted
 * @apiSuccess {Number} award.awardID awardID of award
 * @apiSuccess {Number} award.id ID of award
 * @apiSuccess {String} award.grantF grantf of award
 * @apiSuccess {String} award.chairGrantTitle chair grant title of award
 * @apiSuccess {String} award.collegeHasNominated which college has nominated theaward
 * @apiSuccess {String} award.recipientOrNominee recipient or nominee of award
 * @apiSuccess {String} award.professionalChair professional chair of award
 * @apiSuccess {Date} award.approvedStartDate approved start date of award
 * @apiSuccess {Date} award.endDate end date of award
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *    "status": 200,
 *    "message": "Successfully deleted award",
 *    "data": [
 *        {
 *            "awardID": 4,
 *            "id": 3,
 *            "grantF": "Hlloasdsad",
 *            "chairGrantTitle": "Mea123123",
 *            "collegeHasNominated": "hl1445",
 *            "recipientOrNominee": "You456",
 *            "professionalChair": "him334",
 *            "approvedStartDate": "1999-12-31T16:00:00.000Z",
 *            "endDate": "2000-12-31T16:00:00.000Z"
 *        }
 *     ]
 *   }
 *
 *
 * @apiError (Error 500) {String} status status code
 * @apiError (Error 500) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 * @apiError (Error 404) {String} status status code
 * @apiError (Error 404) {String} message Error message
 * HTTP/1.1 404 Award not found
 * {
 *   "status": 404,
 *   "message": "Award not found"
 * }
 */

router.delete('/award/:awardID', async (req, res) => {
  try {
    const award = await Ctrl.getAward(req.params);
    await Ctrl.deleteAward(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully deleted award',
      data: award,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Award not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {get} /award/:awardID getAward
 * @apiGroup Award
 * @apiName getAward
 *
 * @apiParam (Query Params) {Number} awardID ID of award
 *
 * @apiSuccess {Object} award Award fetched
 * @apiSuccess {Number} award.awardID awardID of award
 * @apiSuccess {Number} award.id ID of award
 * @apiSuccess {String} award.grantF grantf of award
 * @apiSuccess {String} award.chairGrantTitle chair grant title of award
 * @apiSuccess {String} award.collegeHasNominated which college nominated the award
 * @apiSuccess {String} award.recipientOrNominee recipient or nominee of award
 * @apiSuccess {String} award.professionalChair professional chair of award
 * @apiSuccess {Date} award.approvedStartDate approved start date of award
 * @apiSuccess {Date} award.endDate end date of award
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *       "status": 200,
 *       "message": "Successfully fetched award",
 *       "data": [
 *           {
 *               "awardID": 4,
 *               "id": 3,
 *               "grantF": "Hlloasdsad",
 *               "chairGrantTitle": "Mea123123",
 *               "collegeHasNominated": "hl1445",
 *               "recipientOrNominee": "You456",
 *               "professionalChair": "him334",
 *               "approvedStartDate": "1999-12-31T16:00:00.000Z",
 *               "endDate": "2001-12-31T16:00:00.000Z"
 *           }
 *       ]
 *   }
 * @apiError (Error 500) {String} status status code
 * @apiError (Error 500) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 * @apiError (Error 404) {String} status status code
 * @apiError (Error 404) {String} message Error message
 * HTTP/1.1 404 Award not found
 * {
 *   "status": 404,
 *   "message": "Award not found"
 * }
 */

router.get('/award/:awardID', async (req, res) => {
  try {
    const award = await Ctrl.getAward(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched award',
      data: award,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Award not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {get} /award/ getAwards
 * @apiGroup Award
 * @apiName getAwards
 *
 * @apiParam (Query Params) {String} [chairGrantTitle] chair grant title of award
 * @apiParam (Query Params) {String} [collegeHasNominated] which college nominated the award
 * @apiParam (Query Params) {String} [recipientOrNominee] recipient or nominee of award
 * @apiParam (Query Params) {String} [professionalChair] professional chair of award
 * @apiParam (Query Params) {Date} [approvedStartDate] approved start date of award
 * @apiParam (Query Params) {Date} [endDate] end date of award
 * @apiParam (Query Params) {Number} [page] page number
 * @apiParam (Query Params) {Number} [limit] count limit of awards to fetch
 * @apiParam (Query Params) {String} [sortBy] sort data by 'ASC' or 'DESC'
 * @apiParam (Query Params) {String} [field] order data depending on this field. Default value is 'chairGrantTitle'
 *
 * @apiSuccess {Object} award Awards fetched
 * @apiSuccess {Number} award.awardID ID of award
 * @apiSuccess {Number} award.id ID of award
 * @apiSuccess {String} award.grantF grantf of award
 * @apiSuccess {String} award.chairGrantTitle chair grant title of award
 * @apiSuccess {String} award.collegeHasNominated which college nominated the award
 * @apiSuccess {String} award.recipientOrNominee recipient or nominee of award
 * @apiSuccess {String} award.professionalChair professional chair of award
 * @apiSuccess {Date} award.approvedStartDate approved start date of award
 * @apiSuccess {Date} award.endDate end date of award
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *  {
 *     "status": 200,
 *     "message": "Successfully fetched awards",
 *     "data": [
 *        {
 *           "awardID": 4,
 *           "id": 3,
 *           "grantF": "Hi",
 *           "chairGrantTitle": "Meaee",
 *           "collegeHasNominated": "156",
 *           "recipientOrNominee": "Youuuu",
 *           "professionalChair": "her",
 *           "approvedStartDate": "2000-12-31T16:00:00.000Z",
 *           "endDate": "2009-12-31T16:00:00.000Z"
 *         },
 *        {
 *           "awardID": 5,
 *           "id": 4,
 *           "grantF": "Hilo",
 *           "chairGrantTitle": "Mec",
 *           "collegeHasNominated": "156",
 *           "recipientOrNominee": "me",
 *           "professionalChair": "him",
 *           "approvedStartDate": "1999-12-31T16:00:00.000Z",
 *           "endDate": "2003-12-31T16:00:00.000Z"
 *         }
 *       ],
 *    "total": 2,
 *    "limit": 12,
 *    "page": 1,
 *    "pages": 1
 *   }
 * @apiError (Error 500) {String} status status code
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
 * HTTP/1.1 404 Award not found
 * {
 *   "status": 404,
 *   "message": "Award not found"
 * }
 */

router.get('/award/', async (req, res) => {
  try {
    const awards = await Ctrl.getAwards(req.query);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched awards',
      data: awards,
      total: (await Ctrl.getTotalAwards(req.query)).total,
      limit: parseInt(req.query.limit) || 12,
      page: parseInt(req.query.page) || 1,
      pages: Math.ceil(
        (await Ctrl.getTotalAwards(req.query)).total /
          (parseInt(req.query.limit) || 12),
      ),
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Award/s not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

export default router;
