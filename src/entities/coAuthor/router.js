import { Router } from 'express';
import {
  getIDofFSRfromCreativeWork,
  getUserIDofFSR,
  getIDofFSRfromCWorkCoAuth,
} from '../../middlewares/controller';
import * as Ctrl from './controller';

const router = Router();

/**
 * @api {post} /cworkCoAuthor/ addCworkCoAuthor
 * @apiGroup CworkCoAuthor
 * @apiName addCworkCoAuthor
 *
 * @apiParam (Body Params) {Number} creativeWorkID ID of creative work
 * @apiParam (Body Params) {String} name name of co-author as user
 *
 * @apiSuccess {Object} data CworkCoAuthor fetched
 * @apiSuccess {Number} data.creativeWorkID ID of creative work
 * @apiSuccess {String} data.name name of co-author as user
 * @apiSuccess {Number} data.cworkCoAuthorID ID of cworkCoAuthor
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 * {
 *     "status": 200,
 *     "message": "Successfully created co-author",
 *     "data": {
 *         "cworkCoAuthorID": 16,
 *         "creativeWorkID": 3,
 *         "name": Erlen
 *     }
 * }
 * @apiError (Error 500) {Number} status status code
 * @apiError (Error 500) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 */

router.post('/cworkCoAuthor/', async (req, res) => {
  try {
    const idOfCreativeWork = await getIDofFSRfromCreativeWork(
      req.body.creativeWorkID,
    );
    const userIDofFSR = await getUserIDofFSR(
      idOfCreativeWork,
      req.session.user.userID,
    );
    const cworkCoAuthorID = await Ctrl.addCworkCoAuthor(req.body);
    const cworkCoAuthor = await Ctrl.getCworkCoAuthor({ cworkCoAuthorID });
    res.status(200).json({
      status: 200,
      message: 'Successfully created co-author',
      data: cworkCoAuthor,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 403:
        message = 'Unauthorized access';
        break;
      case 404:
        message = 'Creative work not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {get} /cworkCoAuthor/ getCworkCoAuthors
 * @apiGroup CworkCoAuthor
 * @apiName getCworkCoAuthors
 *
 * @apiParam (Query Params) {Number} cworkCoAuthorID ID of creative work co-author
 * @apiParam (Query Params) {Number} creativeWorkID ID of creative work
 * @apiParam (Query Params) {String} name name of co-author as user
 * @apiParam (Query Params) {Number} [page] page number
 * @apiParam (Query Params) {Number} [limit] count limit of awards to fetch
 * @apiParam (Query Params) {String} [sortBy] sort data by 'ASC' or 'DESC'
 * @apiParam (Query Params) {String} [field] order data depending on this field. Default value is 'chairGrantTitle'
 *
 * @apiSuccess {Object[]} data CworkCoAuthors fetched
 * @apiSuccess {Number} data.creativeWorkID ID of creative work
 * @apiSuccess {Number} data.name ID of co-author as user
 * @apiSuccess {Number} data.cworkCoAuthorID ID of cworkCoAuthor
 * @apiSuccess {Number} total Total amount of documents.
 * @apiSuccess {Number} limit Max number of documents
 * @apiSuccess {Number} page nth page this query is.
 * @apiSuccess {Number} pages Number of total pages.
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 * {
 *     "status": 200,
 *     "message": "Successfully fetched co-authors",
 *     "data": [
 *         {
 *             "cworkCoAuthorID": 4,
 *             "creativeWorkID": 1,
 *             "name": Erlen
 *         },
 *         {
 *             "cworkCoAuthorID": 5,
 *             "creativeWorkID": 1,
 *             "name": Erlen
 *         }
 *     ],
 *     "total": 2,
 *     "limit": 12,
 *     "page": 1,
 *     "pages": 1
 * }
 * @apiError (Error 500) {Number} status status code
 * @apiError (Error 500) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 * }
 */

router.get('/cworkCoAuthor/', async (req, res) => {
  try {
    const cworkCoAuthor = await Ctrl.getCworkCoAuthors(req.query);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched co-authors',
      data: cworkCoAuthor,
      total: (await Ctrl.getTotalCworkCoAuthors(req.query)).total,
      limit: req.query.limit || 12,
      page: req.query.page || 1,
      pages: Math.ceil(
        (await Ctrl.getTotalCworkCoAuthors(req.query)).total /
          (req.query.limit || 12),
      ),
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 403:
        message = 'Unauthorized access';
        break;
      case 404:
        message = 'Co-authors not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {delete} /cworkCoAuthor/:cworkCoAuthorID deleteCworkCoAuthor
 * @apiGroup CworkCoAuthor
 * @apiName deleteCworkCoAuthor
 *
 * @apiParam (Query Params) {Number} cworkCoAuthorID ID of co-author
 *
 * @apiSuccess {Object} data CworkCoAuthor fetched
 * @apiSuccess {Number} data.creativeWorkID ID of creative work
 * @apiSuccess {String} data.name name of co-author as user
 * @apiSuccess {Number} data.cworkCoAuthorID ID of cworkCoAuthor
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 * {
 *     "status": 200,
 *     "message": "Successfully deleted co-author",
 *     "data": {
 *         "cworkCoAuthorID": 10,
 *         "creativeWorkID": 1,
 *         "name": Erlen
 *     }
 * }
 * @apiError (Error 500) {Number} status status code
 * @apiError (Error 500) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 * @apiError (Error 404) {Number} status status code
 * @apiError (Error 404) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 404 Co-author not found
 * {
 *   "status": 404,
 *   "message": "Co-author not found"
 * }
 */

router.delete('/cworkCoAuthor/:cworkCoAuthorID', async (req, res) => {
  try {
    const idOfCreativeWork = await getIDofFSRfromCWorkCoAuth(
      req.params.cworkCoAuthorID,
    );
    const userIDofFSR = await getUserIDofFSR(
      idOfCreativeWork,
      req.session.user.userID,
    );
    const cworkCoAuthor = await Ctrl.getCworkCoAuthor(req.params);
    await Ctrl.deleteCworkCoAuthor(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully deleted co-author',
      data: cworkCoAuthor,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 403:
        message = 'Unauthorized access';
        break;
      case 404:
        message = 'Co-author not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {get} /cworkCoAuthor/:cworkCoAuthorID getCworkCoAuthor
 * @apiGroup CworkCoAuthor
 * @apiName getCworkCoAuthor
 *
 * @apiParam (Query Params) {Number} cworkCoAuthorID ID of co-author
 *
 * @apiSuccess {Object} datadata CworkCoAuthor fetched
 * @apiSuccess {Number} datadata.creativeWorkID ID of creative work
 * @apiSuccess {String} datadata.name name of co-author as user
 * @apiSuccess {Number} datadata.cworkCoAuthorID ID of cworkCoAuthor
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 * {
 *     "status": 200,
 *     "message": "Successfully fetched co-author",
 *     "data": {
 *         "cworkCoAuthorID": 4,
 *         "creativeWorkID": 1,
 *         "name": Erlen
 *     }
 * }
 * @apiError (Error 500) {Number} status status code
 * @apiError (Error 500) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 * @apiError (Error 404) {Number} status status code
 * @apiError (Error 404) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 404 Co-author not found
 * {
 *   "status": 404,
 *   "message": "Co-author not found"
 * }
 */

router.get('/cworkCoAuthor/:cworkCoAuthorID', async (req, res) => {
  try {
    const idOfCreativeWork = await getIDofFSRfromCWorkCoAuth(
      req.params.cworkCoAuthorID,
    );
    const userIDofFSR = await getUserIDofFSR(
      idOfCreativeWork,
      req.session.user.userID,
    );
    const cworkCoAuthor = await Ctrl.getCworkCoAuthor(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched co-author',
      data: cworkCoAuthor,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 403:
        message = 'Unauthorized access';
        break;
      case 404:
        message = 'Co-author not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {put} /cworkCoAuthor/:cworkCoAuthorID updateCworkCoAuthor
 * @apiGroup CworkCoAuthor
 * @apiName updateCworkCoAuthor
 *
 * @apiParam (Query Params) {Number} cworkCoAuthorID ID of co-author
 *
 * @apiParam (Body Params) {Number} [creativeWorkID] ID of creative work
 * @apiParam (Body Params) {String} [name] name of co-author as user
 *
 * @apiSuccess {Object} data CworkCoAuthor fetched
 * @apiSuccess {Number} data.creativeWorkID ID of creative work
 * @apiSuccess {String} data.name name of co-author as user
 * @apiSuccess {Number} data.cworkCoAuthorID ID of cworkCoAuthor
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 * {
 *     "status": 200,
 *     "message": "Successfully updated co-author",
 *     "data": {
 *         "cworkCoAuthorID": 4,
 *         "creativeWorkID": 1,
 *         "name": Erlen
 *     }
 * }
 * @apiError (Error 500) {Number} status status code
 * @apiError (Error 500) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 * @apiError (Error 404) {Number} status status code
 * @apiError (Error 404) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 404 Co-author not found
 * {
 *   "status": 404,
 *   "message": "Co-author not found"
 * }
 */

router.put('/cworkCoAuthor/:cworkCoAuthorID', async (req, res) => {
  try {
    const idOfCreativeWork = await getIDofFSRfromCWorkCoAuth(
      req.params.cworkCoAuthorID,
    );
    const userIDofFSR = await getUserIDofFSR(
      idOfCreativeWork,
      req.session.user.userID,
    );
    await Ctrl.updateCworkCoAuthor(req.params, req.body);
    const cworkCoAuthor = await Ctrl.getCworkCoAuthor(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully updated co-author',
      data: cworkCoAuthor,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 403:
        message = 'Unauthorized access';
        break;
      case 404:
        message = 'Co-author not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

export default router;
