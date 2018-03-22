import { Router } from 'express';
import bcrypt from 'bcrypt';
import * as Ctrl from './controller';

const router = Router();

/**
 * @api {get} /award/:id getAward
 * @apiGroup Award
 * @apiName getAward
 *
 * @apiParam (Query Params) {Integer} id ID of award
 *
 * @apiSuccess {Object} award Award fetched
 * @apiSuccess {Integer} award.id ID of award
 * @apiSuccess {String} award.grantF grantf of award
 * @apiSuccess {String} award.chairGrantTitle chair grant title of award
 * @apiSuccess {String} award.collegeHasNominated which college nominated the award
 * @apiSuccess {String} award.recipientOrNominee recipient or nominee of award
 * @apiSuccess {String} award.professionalChair professional chair of award
 * @apiSuccess {String} award.approvedStartDate approved start date of award
 * @apiSuccess {String} award.endDate end date of award
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *  {
 *    "status": 200,
 *    "message": "Successfully fetched award",
 *    "data": [
 *       {
 *           "id": 1,
 *           "grantF": "Hi",
 *           "chairGrantTitle": "Mea",
 *           "collegeHasNominated": "123",
 *           "recipientOrNominee": "You",
 *           "professionalChair": "him",
 *           "approvedStartDate": "ystrday",
 *           "endDate": "tomo"
 *       }
 *     ]
 *   }
 * @apiError (Error 500) {String[]} errors List of errors
 * @apiError (Error 500) {String} errors.message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 *
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
 * @api {post} /award addAward
 * @apiGroup Award
 * @apiName addAward
 *
 * @apiParam (Body Params) {Integer} id ID of award
 * @apiParam (Body Params) {String} grantF grantF of award
 * @apiParam (Body Params) {String} chairGrantTitle chair grant title of award
 * @apiParam (Body Params) {String} collegeHasNominated which college has nominated the award
 * @apiParam (Body Params) {String} recipientOrNominee recipient or nominee of award
 * @apiParam (Body Params) {String} proffesionalChair professional chai of award
 * @apiParam (Body Params) {String} approvedStartDate approved start date of award
 * @apiParam (Body Params) {String} endDate end date of award
 *
 * @apiSuccess {Object} award new Award
 * @apiSuccess {Integer} award.id ID of award
 * @apiSuccess {String} award.grantF grantf of award
 * @apiSuccess {String} award.chairGrantTitle chair grant title of award
 * @apiSuccess {String} award.collegeHasNominated which college has nominated the award
 * @apiSuccess {String} award.recipientOrNominee recipient or nominee of award
 * @apiSuccess {String} award.professionalChair professional chair of award
 * @apiSuccess {String} award.approvedStartDate approved start date of award
 * @apiSuccess {String} award.endDate end date of award
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "data": {
 *        "status": 200;
 *		    "message": 'Succesfully added award'
 *     }
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
 * @api {put} /award/:id updateAward
 * @apiGroup Award
 * @apiName updateAward
 *
 * @apiParam (Query Params) {Integer} id ID of award
 * @apiParam (Body Params) {String} grantF grantF of award
 * @apiParam (Body Params) {String} chairGrantTitle chair grant title of award
 * @apiParam (Body Params) {String} collegeHasNominated which college nominated the award
 * @apiParam (Body Params) {String} recipientOrNominee recipient or nominee of award
 * @apiParam (Body Params) {String} proffesionalChair professional chair of award
 * @apiParam (Body Params) {String} approvedStartDate approved start date of award
 * @apiParam (Body Params) {String} endDate end date of award
 *
 * @apiSuccess {Object} award Award updated
 * @apiSuccess {Integer} award.id ID of award
 * @apiSuccess {String} award.grantF grantf of award
 * @apiSuccess {String} award.chairGrantTitle chair grant title of award
 * @apiSuccess {String} award.collegeHasNominated which college nominated the award
 * @apiSuccess {String} award.recipientOrNominee recipient or nominee of award
 * @apiSuccess {String} award.professionalChair professional chair of award
 * @apiSuccess {String} award.approvedStartDate approved start date of award
 * @apiSuccess {String} award.endDate end date of award
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "data": {
 *        "status": 200;
 *        "message": 'Succesfully updated award'
 *     }
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
 *
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
 * @api {delete} /award/:id deleteAward
 * @apiGroup Award
 * @apiName deleteAward
 *
 * @apiParam (Query Params) {Integer} id ID of award
 *
 * @apiSuccess {Object} award Award deleted
 * @apiSuccess {Integer} award.id ID of award
 * @apiSuccess {String} award.grantF grantf of award
 * @apiSuccess {String} award.chairGrantTitle chair grant title of award
 * @apiSuccess {String} award.collegeHasNominated which college has nominated theaward
 * @apiSuccess {String} award.recipientOrNominee recipient or nominee of award
 * @apiSuccess {String} award.professionalChair professional chair of award
 * @apiSuccess {String} award.approvedStartDate approved start date of award
 * @apiSuccess {String} award.endDate end date of award
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "data": {
 *        "status": 200;
 *        "message": 'Succesfully deleted award'
 *     }
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
 *
 * HTTP/1.1 404 Award not found
 * {
 *   "status": 404,
 *   "message": "Award not found"
 * }
 */

router.delete('/award/:awardID', async (req, res) => {
  try {
    await Ctrl.deleteAward(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully deleted award',
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

 *
 * @apiSuccess {Object} award Awards fetched
 * @apiSuccess {Integer} award.id ID of award
 * @apiSuccess {String} award.grantF grantf of award
 * @apiSuccess {String} award.chairGrantTitle chair grant title of award
 * @apiSuccess {String} award.collegeHasNominated which college nominated the award
 * @apiSuccess {String} award.recipientOrNominee recipient or nominee of award
 * @apiSuccess {String} award.professionalChair professional chair of award
 * @apiSuccess {String} award.approvedStartDate approved start date of award
 * @apiSuccess {String} award.endDate end date of award
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *  {
 *    "status": 200,
 *    "message": "Successfully fetched award",
 *    "data": [
 *       {
 *           "id": 1,
 *           "grantF": "Hi",
 *           "chairGrantTitle": "Mea",
 *           "collegeHasNominated": "123",
 *           "recipientOrNominee": "You",
 *           "professionalChair": "him",
 *           "approvedStartDate": "ystrday",
 *           "endDate": "tomo"
 *       },
 *       {
 *           "id": 4,
 *           "grantF": "Hi",
 *           "chairGrantTitle": "Meaee",
 *           "collegeHasNominated": "156",
 *           "recipientOrNominee": "Youuuu",
 *           "professionalChair": "her",
 *           "approvedStartDate": "2day",
 *           "endDate": "tomor"
 *       }
 *    ]
 *  }
 * @apiError (Error 500) {String[]} errors List of errors
 * @apiError (Error 500) {String} errors.message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 *
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
      total: awards.length,
      limit: req.query.limit || 10,
      page: req.query.page || 1,
      pages: Math.ceil(awards.length / (req.query.limit || 10)),
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

export default router;
