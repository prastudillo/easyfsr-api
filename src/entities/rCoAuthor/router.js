import { Router } from 'express';
import bcrypt from 'bcrypt';
import * as Ctrl from './controller';

const router = Router();

/**
 * @api {post} /rCoAuthor addrCoAuthor
 * @apiGroup rCoAuthor
 * @apiName addrCoAuthor
 *
 * @apiParam (Body Params) {String} rCoAuthorID ID rCoAuthor
 * @apiParam (Body Params) {String} researchID ID of research
 * @apiParam (Body Params) {String} name name of CoAuthor
 *
 * @apiSuccess {Object} rCoAuthor Successfully Research with CoAuthor added
 * @apiSuccess {String} rCoAuthor.rCoAuthorID rCoAuthorID of rCoAuthor
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *   "status": 200,
 *   "message": "Successfully created research with coAuthor",
 *   "data":
 *      {
 *       "researchID": 91,
 *       "id": 1,
 *       "type": "annyeong",
 *       "role": "role1",
 *       "title": "title",
 *       "startDate": "2013-01-31T16:00:00.000Z",
 *       "endDate": "2015-01-31T16:00:00.000Z",
 *       "funding": "fund",
 *       "approvedUnits": "20",
 *       "filepath": null,
 *       "rCoAuthorID": 202,
 *       "name": "Shane Semathia"
 *      }
 *    }
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

router.post('/rCoAuthor/', async (req, res) => {
  try {
    const rCoAuthorID = await Ctrl.addrCoAuthor(req.body);
    const rCoAuthor = await Ctrl.getrCoAuthor({ rCoAuthorID });
    res.status(200).json({
      status: 200,
      message: 'Successfully created research with coAuthor',
      data: rCoAuthor,
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
 * @api {put} /rCoAuthor/:rCoAuthorID updaterCoAuthor
 * @apiGroup rCoAuthor
 * @apiName updaterCoAuthor
 *
 * @apiParam (Body Params) {String} rCoAuthorID ID of rCoAuthor
 * @apiParam (Body Params) {String} researchID ID of research
 * @apiParam (Body Params) {String} name name of coAuthor
 *
 * @apiSuccess {Object} rCoAuthor Successfully updated research with coAuthor
 * @apiSuccess {String} rCoAuthor.rCoAuthorID rCoAuthorID of rCoAuthor
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *   "status": 200,
 *   "message": "Successfully updated research with coAuthor",
 *   "data": {
 *       "researchID": 20,
 *       "id": 20,
 *       "type": "Implementation",
 *       "role": "Sample Role",
 *       "title": "Sample Title",
 *       "startDate": "2017-04-07T16:00:00.000Z",
 *       "endDate": null,
 *       "funding": "Sample Funding",
 *       "approvedUnits": "3",
 *       "filepath": null,
 *       "rCoAuthorID": 20,
 *       "name": "Trixie Bza"
 *    }
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

router.put('/rCoAuthor/:rCoAuthorID', async (req, res) => {
  try {
    await Ctrl.updaterCoAuthor(req.params, req.body);
    const rCoAuthor = await Ctrl.getrCoAuthor(req.params);

    res.status(200).json({
      status: 200,
      message: 'Successfully updated research with coAuthor',
      data: rCoAuthor,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Research with coAuthor not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {delete} /rCoAuthor/:rCoAutorID deleterCoAuthor
 * @apiGroup rCoAuthor
 * @apiName deleterCoAuthor
 *
 * @apiParam (Body Params) {String} rCoAuthorID ID of rCoAuthor
 * @apiParam (Body Params) {String} researchID ID of research
 * @apiParam (Body Params) {String} name name of coAuthor
 *
 * @apiSuccess {Object} rCoAuthor Successfully deleted research with coAuthor
 * @apiSuccess {String} rCoAuthor.rCoAuthorID rCoAuthorID of rCoAuthor
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 * {
 *   "status": 200,
 *   "message": "Successfully deleted research with coAuthor",
 *   "data": {
 *       "researchID": 20,
 *       "id": 20,
 *       "type": "Implementation",
 *       "role": "Sample Role",
 *       "title": "Sample Title",
 *       "startDate": "2017-04-07T16:00:00.000Z",
 *       "endDate": null,
 *       "funding": "Sample Funding",
 *       "approvedUnits": "3",
 *       "filepath": null,
 *       "rCoAuthorID": 20,
 *       "name": "Trixie Bza"
 *    }
 *   }
 * @apiError (Error 500) {String} status status code
 * @apiError (Error 500) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 */

router.delete('/rCoAuthor/:rCoAuthorID', async (req, res) => {
  try {
    const rCoAuthor = await Ctrl.getrCoAuthor(req.params);
    await Ctrl.deleterCoAuthor(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully deleted research with coAuthor',
      data: rCoAuthor,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Research with coAuthor not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {get} /rCoAuthor/:rCoAuthorID getrCoAuthor
 * @apiGroup rCoAuthor
 * @apiName getrCoAuthor
 *
 * @apiParam (Body Params) {String} rCoAuthorID ID of rCoAuthor
 * @apiParam (Body Params) {String} researchID ID of research
 * @apiParam (Body Params) {String} name name of coAuthor
 *
 * @apiSuccess {Object} rCoAuthor Successfully fetched research with coAuthor
 * @apiSuccess {String} rCoAuthor.rCoAuthorID rCoAuthorID of rCoAuthor
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 * {
 *     "status": 200,
 *     "message": "Successfully fetched research with coAuthor",
 *     "data": {
 *         "researchID": 87,
 *         "id": 87,
 *         "type": "Proposal",
 *         "role": "Sample Role",
 *         "title": "Sample Title",
 *         "startDate": "2017-05-31T16:00:00.000Z",
 *         "endDate": null,
 *         "funding": "Sample Funding",
 *         "approvedUnits": "4",
 *         "filepath": null,
 *         "rCoAuthorID": 1,
 *         "name": "13"
 *     }
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

router.get('/rCoAuthor/:rCoAuthorID', async (req, res) => {
  try {
    const rCoAuthor = await Ctrl.getrCoAuthor(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched research with coAuthor',
      data: rCoAuthor,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Research with coAuthor not found';
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
 * @api {get} /rCoAuthor getrCoAuthors
 * @apiGroup rCoAuthor
 * @apiName getrCoAuthors
 *
 * @apiParam (Body Params) {String} rCoAuthorID ID of rCoAuthor
 * @apiParam (Body Params) {String} researchID ID of research
 * @apiParam (Body Params) {String} name name of coAuthor
 *
 * @apiSuccess {Object} rCoAuthor Successfully fetched researches with coAuthor
 * @apiSuccess {String} rCoAuthor.rCoAuthorID rCoAuthorID of rCoAuthor
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 * {
 *   "status": 200,
 *   "message": "Successfully fetched researches with coAuthor",
 *   "data": [
 *     {
 *         "researchID": 1,
 *         "id": 1,
 *         "type": "Implementation",
 *         "role": "Sample Role",
 *         "title": "Sample Title",
 *         "startDate": "2017-10-20T16:00:00.000Z",
 *         "endDate": null,
 *         "funding": "Sample Funding",
 *         "approvedUnits": "6",
 *         "filepath": null,
 *         "rCoAuthorID": 117,
 *         "name": "5"
 *     },
 *     {
 *         "researchID": 1,
 *         "id": 1,
 *         "type": "Implementation",
 *         "role": "Sample Role",
 *         "title": "Sample Title",
 *         "startDate": "2017-10-20T16:00:00.000Z",
 *         "endDate": null,
 *         "funding": "Sample Funding",
 *         "approvedUnits": "6",
 *         "filepath": null,
 *         "rCoAuthorID": 198,
 *         "name": "8"
 *     },
 *     {
 *         "researchID": 2,
 *         "id": 2,
 *         "type": "Implementation",
 *         "role": "Sample Role",
 *         "title": "Sample Title",
 *         "startDate": "2017-05-22T16:00:00.000Z",
 *         "endDate": null,
 *         "funding": "Sample Funding",
 *         "approvedUnits": "6",
 *         "filepath": null,
 *         "rCoAuthorID": 168,
 *         "name": "29"
 *     }
 *   ],
 *   "total": 202,
 *   "limit": 12,
 *   "page": 1,
 *   "pages": 17
 * }
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

router.get('/rCoAuthor/', async (req, res) => {
  try {
    const rCoAuthors = await Ctrl.getrCoAuthors(req.query);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched researches with coAuthor',
      data: rCoAuthors,
      total: (await Ctrl.getTotalrCoAuthors(req.query)).total,
      limit: parseInt(req.query.limit) || 12,
      page: parseInt(req.query.page) || 1,
      pages: Math.ceil(
        (await Ctrl.getTotalrCoAuthors(req.query)).total /
          (parseInt(req.query.limit) || 12),
      ),
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Research with coAuthor/s not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

export default router;
