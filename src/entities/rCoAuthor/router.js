import { Router } from 'express';
import bcrypt from 'bcrypt';
import * as Ctrl from './controller';

const router = Router();

/**
 * @api {post} /rCoAuthor addrCoAuthor
 * @apiGroup rCoAuthor
 * @apiName addrCoAuthor
 *
 * @apiParam (Body Params) {String} userID of user
 * @apiParam (Body Params) {String} researchID ID of research
 * @apiParam (Body Params) {String} rCoAuthorID ID of rCoAuthor
 *
 * @apiSuccess {Object} rCoAuthor Successfully Research with CoAuthor added
 * @apiSuccess {String} rCoAuthor.rCoAuthorID rCoAuthorID of rCoAuthor
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "data": {
 *        "status": 200;
 *        "message": 'Successfully added research with coAuthor'
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

router.post('/rCoAuthor/', async (req, res) => {
  try {
    const rCoAuthorID = await Ctrl.addrCoAuthor(req.body);

    const rCoAuthor = await Ctrl.getrCoAuthor({ rCoAuthorID });
    console.log(req.body.rCoAuthor);
    console.log(rCoAuthorID);
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
 * @apiParam (Body Params) {String} userID of user
 * @apiParam (Body Params) {String} researchID ID of research
 * @apiParam (Body Params) {String} rCoAuthorID ID of rCoAuthor
 *
 * @apiSuccess {Object} rCoAuthor Successfully updated research with coAuthor
 * @apiSuccess {String} rCoAuthor.rCoAuthorID rCoAuthorID of rCoAuthor
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "data": {
 *        "status": 200;
 *        "message": 'Successfully updated research with coAuthor'
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
 * @apiParam (Body Params) {String} userID of user
 * @apiParam (Body Params) {String} researchID ID of research
 * @apiParam (Body Params) {String} rCoAuthorID ID of rCoAuthor
 *
 * @apiSuccess {Object} rCoAuthor Successfully deleted research with coAuthor
 * @apiSuccess {String} rCoAuthor.rCoAuthorID rCoAuthorID of rCoAuthor
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "data": {
 *        "status": 200;
 *        "message": 'Successfully deleted research with coAuthor'
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

router.delete('/rCoAuthor/:rCoAuthorID', async (req, res) => {
  try {
    const rCoAuthorID = await Ctrl.deleterCoAuthor(req.body);
    const rCoAuthor = await Ctrl.getrCoAuthor({ rCoAuthorID });

    console.log(rCoAuthor);
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
 * @apiParam (Body Params) {String} userID of user
 * @apiParam (Body Params) {String} researchID ID of research
 * @apiParam (Body Params) {String} rCoAuthorID ID of rCoAuthor
 *
 * @apiSuccess {Object} rCoAuthor Successfully fetched research with coAuthor
 * @apiSuccess {String} rCoAuthor.rCoAuthorID rCoAuthorID of rCoAuthor
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "data": {
 *        "status": 200;
 *        "message": 'Successfully fetched research with coAuthor'
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

router.get('/rCoAuthor/:rCoAuthorID', async (req, res) => {
  try {
    const rCoAuthor = await Ctrl.getrCoAuthor(req.params);
    console.log(rCoAuthor);
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
 * @apiParam (Body Params) {String} userID of user
 * @apiParam (Body Params) {String} researchID ID of research
 * @apiParam (Body Params) {String} rCoAuthorID ID of rCoAuthor
 *
 * @apiSuccess {Object} rCoAuthor Successfully fetched researches with coAuthor
 * @apiSuccess {String} rCoAuthor.rCoAuthorID rCoAuthorID of rCoAuthor
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "data": {
 *        "status": 200;
 *        "message": 'Successfully fetched researches with coAuthor'
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

router.get('/rCoAuthor/', async (req, res) => {
  try {
    const rCoAuthors = await Ctrl.getrCoAuthors(req.query);

    res.status(200).json({
      status: 200,
      message: 'Successfully fetched researches with coAuthor',
      data: rCoAuthors,
      total: rCoAuthors.length,
      limit: req.query.limit,
      page: req.query.page,
      pages: Math.ceil(rCoAuthors.length / req.query.limit),
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

export default router;
