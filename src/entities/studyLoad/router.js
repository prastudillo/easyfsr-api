import { Router } from 'express';
import bcrypt from 'bcrypt';
import * as Ctrl from './controller';

const router = Router();

/**
 * @api {post} /studyLoad addStudyLoad
 * @apiGroup Study Load
 * @apiName addStudyLoad 
 *
 * @apiParam (Body Params) {String} id ID of Study Load
 * @apiParam (Body Params) {String} degree degree of study load
 * @apiParam (Body Params) {String} courseNumber course number of study load
 * @apiParam (Body Params) {String} university university of study load
 * @apiParam (Body Params) {String} totalSLcredits total credits of study load

 *
 * @apiSuccess {Object} studyLoad new Study Load created
 * @apiSuccess {String} studyLoad.id ID of Study Load
 * @apiSuccess {String} studyLoad.degree degree of study load
 * @apiSuccess {String} studyLoad.courseNumber course number of study load
 * @apiSuccess {String} studyLoad.university university of study load
 * @apiSuccess {String} studyLoad.totalSLcredits total credits of study load
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "status": 200,
 *     "message": "Successfully created studyLoad"
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

router.post('/studyLoad/', async (req, res) => {
  try {
    // req.body.password = await bcrypt.hash(req.body.password, 10);
    const id = await Ctrl.addStudyLoad(req.body);
    res.status(200).json({
      status: 200,
      message: 'Successfully created studyLoad',
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
 * @api {put} /studyLoad/:id updateStudyLoad
 * @apiGroup Study Load
 * @apiName updateStudyLoad 
 *
 * @apiParam (Body Params) {String} id ID of Study Load
 * @apiParam (Body Params) {String} degree degree of study load
 * @apiParam (Body Params) {String} courseNumber course number of study load
 * @apiParam (Body Params) {String} university university of study load
 * @apiParam (Body Params) {String} totalSLcredits total credits of study load

 *
 * @apiSuccess {Object} studyLoad study load updated
 * @apiSuccess {String} studyLoad.id ID of Study Load
 * @apiSuccess {String} studyLoad.degree degree of study load
 * @apiSuccess {String} studyLoad.courseNumber course number of study load
 * @apiSuccess {String} studyLoad.university university of study load
 * @apiSuccess {String} studyLoad.totalSLcredits total credits of study load
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "status": 200,
 *     "message": "Successfully updated studyLoad"
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
 *   HTTP/1.1 404 studyLoad not found
 *   {
 *     "status": 404,
 *     "message": "studyLoad not found"
 *   }
 */

router.put('/studyLoad/:id', async (req, res) => {
  try {
    // if (req.body.password) {
    //   req.body.password = await bcrypt.hash(req.body.password, 10);
    // }
    await Ctrl.updateStudyLoad(req.params, req.body);
    const studyLoad = await Ctrl.getStudyLoad(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully updated studyLoad',
      data: studyLoad,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'studyLoad not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {get} /studyLoad/:id getStudyLoad
 * @apiGroup Study Load
 * @apiName getStudyLoad 
 *
 * @apiParam (Body Params) {String} id ID of Study Load
 * @apiParam (Body Params) {String} degree degree of study load
 * @apiParam (Body Params) {String} courseNumber course number of study load
 * @apiParam (Body Params) {String} university university of study load
 * @apiParam (Body Params) {String} totalSLcredits total credits of study load

 *
 * @apiSuccess {Object} studyLoad study load retrieved
 * @apiSuccess {String} studyLoad.id ID of Study Load
 * @apiSuccess {String} studyLoad.degree degree of study load
 * @apiSuccess {String} studyLoad.courseNumber course number of study load
 * @apiSuccess {String} studyLoad.university university of study load
 * @apiSuccess {String} studyLoad.totalSLcredits total credits of study load
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "status": 200,
 *     "message": "Successfully retrieved studyLoad details",
 *     "data": [
 *       {
 *           "degree": "BSCS",
 *           "courseNumber": "128",
 *           "university": "UPLB",
 *           "totalSLcredits": 3,
 *           "id": 1
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
 *   HTTP/1.1 404 studyLoad not found
 *   {
 *     "status": 404,
 *     "message": "studyLoad not found"
 *   }
 */

router.get('/studyLoad/:id', async (req, res) => {
  try {
    const studyLoad = await Ctrl.getStudyLoad(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully retrieved studyLoad details',
      data: studyLoad,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'studyLoad not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {get} /studyLoad getAllStudyLoad
 * @apiGroup Study Load
 * @apiName getAllStudyLoad 
 *
 * @apiParam (Body Params) {String} id ID of Study Load
 * @apiParam (Body Params) {String} degree degree of study load
 * @apiParam (Body Params) {String} courseNumber course number of study load
 * @apiParam (Body Params) {String} university university of study load
 * @apiParam (Body Params) {String} totalSLcredits total credits of study load

 *
 * @apiSuccess {Object} studyLoad study load retrieved
 * @apiSuccess {String} studyLoad.id ID of Study Load
 * @apiSuccess {String} studyLoad.degree degree of study load
 * @apiSuccess {String} studyLoad.courseNumber course number of study load
 * @apiSuccess {String} studyLoad.university university of study load
 * @apiSuccess {String} studyLoad.totalSLcredits total credits of study load
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "status": 200,
 *     "message": "Successfully fetched all studyLoad details",
 *     "data": [
 *       {
 *           "degree": "BSCS",
 *           "courseNumber": "128",
 *           "university": "UPLB",
 *           "totalSLcredits": 3,
 *           "id": 1
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
 *   HTTP/1.1 404 studyLoad not found
 *   {
 *     "status": 404,
 *     "message": "studyLoad not found"
 *   }
 */

router.get('/studyLoad/', async (req, res) => {
  try {
    const studyLoads = await Ctrl.getAllStudyLoad(req.query);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched all studyLoad details',
      data: studyLoads,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'studyLoad not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {delete} /studyLoad/:id deleteStudyLoad
 * @apiGroup Study Load
 * @apiName deleteStudyLoad 
 *
 * @apiParam (Body Params) {String} id ID of Study Load
 * @apiParam (Body Params) {String} degree degree of study load
 * @apiParam (Body Params) {String} courseNumber course number of study load
 * @apiParam (Body Params) {String} university university of study load
 * @apiParam (Body Params) {String} totalSLcredits total credits of study load

 *
 * @apiSuccess {Object} studyLoad study load deleted
 * @apiSuccess {String} studyLoad.id ID of Study Load
 * @apiSuccess {String} studyLoad.degree degree of study load
 * @apiSuccess {String} studyLoad.courseNumber course number of study load
 * @apiSuccess {String} studyLoad.university university of study load
 * @apiSuccess {String} studyLoad.totalSLcredits total credits of study load
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "status": 200,
 *     "message": "Successfully deleted studyLoad"
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
 *   HTTP/1.1 404 studyLoad not found
 *   {
 *     "status": 404,
 *     "message": "studyLoad not found"
 *   }
 */

router.delete('/studyLoad/:id', async (req, res) => {
  try {
    const id = await Ctrl.deleteStudyLoad(req.params);
    // const user = await Ctrl.getUser(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully deleted studyLoad',
      //data: user
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'studyLoad not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

export default router;