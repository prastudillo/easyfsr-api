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
 *     "data": {
 *        "status": 200;
 *        "message": 'Successfully added research'
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
 *     "data": {
 *        "status": 200;
 *        "message": 'Successfully updated research'
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
 *     "data": {
 *        "status": 200;
 *        "message": 'Successfully deleted research'
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

router.delete('/research/:researchID', async (req, res) => {
  try {
    const researchID = await Ctrl.deleteResearch(req.body);

    const research = await Ctrl.getResearch({ researchID });

    console.log(research);
    console.log('Req.body.id: ' + req.body.id);
    console.log('Req.body.researchID: ' + req.body.researchID);
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
 * @apiSuccess {Object} research Successfully fetched research
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
 *     "data": {
 *        "status": 200;
 *        "message": 'Successfully fetched research'
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
 * @apiSuccess {Object} research Successfully fetched researches
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
 *     "data": {
 *        "status": 200;
 *        "message": 'Successfully fetched researches'
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

router.get('/research/', async (req, res) => {
  try {
    const researches = await Ctrl.getResearches(req.query);

    res.status(200).json({
      status: 200,
      message: 'Successfully fetched researches',
      data: researches,
      total: researches.length,
      limit: req.query.limit,
      page: req.query.page,
      pages: Math.ceil(researches.length / req.query.limit),
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
 * @api {get} /researchTotal/ getTotalResearches
 * @apiGroup Research
 * @apiName getTotalResearches
 * *
 * @apiSuccess {Integer} total total number of researches
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *  {
    "status": 200,
    "message": "Successfully fetched researches count",
    "data": [
        {
            "total": 11
        }
    ]
  }
 * @apiError (Error 500) {Integer} errors.status 500
 * @apiError (Error 500) {String} errors.message Internal server error
 * @apiError (Error 404) {Integer} errors.status 400
 * @apiError (Error 404) {String} errors.message Researches not found
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 *
 * HTTP/1.1 404 Subjects not found
 * {
 *   "status": 404,
 *   "message": "Researches not found"
 * }
 */

router.get('/researchTotal/', async (req, res) => {
  try {
    const totalResearches = await Ctrl.getTotalResearches(req.query);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched researches count',
      data: totalResearches,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Researches not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {get} /researchTotalByFSR/:id getTotalResearchesByFSR
 * @apiGroup Research
 * @apiName getTotalResearchesByFSR
 * *
 * @apiSuccess {Integer} total total number of researches by fsr
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *  {
      "status": 200,
      "message": "Successfully fetched researches by fsr count",
      "data": [
          {
              "total": 11
          }
      ]
    }
 * @apiError (Error 500) {Integer} errors.status 500
 * @apiError (Error 500) {String} errors.message Internal server error
 * @apiError (Error 404) {Integer} errors.status 400
 * @apiError (Error 404) {String} errors.message Researches by fsr not found
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 *
 * HTTP/1.1 404 Subjects not found
 * {
 *   "status": 404,
 *   "message": "Researches by fsr not found"
 * }
 */

router.get('/researchTotalByFSR/:id', async (req, res) => {
  try {
    const totalResearchesByFSR = await Ctrl.getTotalResearchesByFSR(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched researches by fsr count',
      data: totalResearchesByFSR,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Researches by fsr not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

export default router;
