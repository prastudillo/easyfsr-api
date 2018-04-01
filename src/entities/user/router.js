import { Router } from 'express';
import bcrypt from 'bcrypt';
import * as Ctrl from './controller';

const router = Router();

/**
 * @api {post} /user addUser
 * @apiGroup User
 * @apiName addUser
 *
 * @apiParam (Body Params) {String} employeeID ID of employee
 * @apiParam (Body Params) {String} password password of employee
 * @apiParam (Body Params) {String} firstName first name of employee
 * @apiParam (Body Params) {String} [middleName] middle name of employee
 * @apiParam (Body Params) {String} lastName last name of employee
 * @apiParam (Body Params) {String} [committee] committee of employee, if exists
 * @apiParam (Body Params) {Boolean} [isHead] indicates if employee is head
 * @apiParam (Body Params) {String} [officeNumber] office number of employee
 * @apiParam (Body Params) {String} [contractType] contract type of employee. Can be "FULL-TIME" or "PART-TIME"
 * @apiParam (Body Params) {String} emailAddress email address of employee
 * @apiParam (Body Params) {String} [rank] rank of employee
 * @apiParam (Body Params) {String} [isArchived] indicates if employee entry is archived
 * @apiParam (Body Params) {String} [acctType] account type of employee. Can be "USER" or "ADMIN"
 *
 * @apiSuccess {Object} user new User created
 * @apiSuccess {Number} user.userID ID of user
 * @apiSuccess {String} user.employeeID ID of employee
 * @apiSuccess {String} user.password password of employee
 * @apiSuccess {String} user.firstName first name of employee
 * @apiSuccess {String} user.middleName middle name of employee
 * @apiSuccess {String} user.lastName last name of employee
 * @apiSuccess {String} user.committee committee of employee, if exists
 * @apiSuccess {Boolean} user.isHead  indicates if employee is head
 * @apiSuccess {String} user.officeNumber office number of employee
 * @apiSuccess {String} user.contractType contract type of employee
 * @apiSuccess {String} user.emailAddress email address of employee
 * @apiSuccess {String} user.rank rank of employee
 * @apiSuccess {String} user.isArchived indicates if employee entry is archived
 * @apiSuccess {String} user.acctType account type of employee
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "status": 200;
 *		 "message": 'Succesfully created user'
 *     "data":
 *        {
 *          "userID": 3,
 *          "employeeID": "51111231223",
 *          "firstName": "Marie",
 *          "middleName": "S",
 *          "lastName": "Smith",
 *          "committee": null,
 *          "isHead": null,
 *          "officeNumber": "118",
 *          "contractType": "part-time",
 *          "emailAddress": "marieSmith@up.edu.ph",
 *          "rank": null,
 *          "isArchived": 0,
 *          "acctType": "USER"
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

router.post('/user/', async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const userID = await Ctrl.addUser(req.body);
    const user = await Ctrl.getUserByUserID({ userID });
    delete user.password;
    res.status(200).json({
      status: 200,
      message: 'Successfully created user',
      data: user,
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
 * @api {get} /user getUsers
 * @apiGroup User
 * @apiName getUsers
 *
 * @apiParam (Query Params) {String} [firstName] first name of employee
 * @apiParam (Query Params) {String} [lastName] last name of employee
 * @apiParam (Query Params) {String} [middleName] middle name of employee
 * @apiParam (Query Params) {String} [committee]  committee of employee
 * @apiParam (Query Params) {Number} [officeNumber] room number of employee
 * @apiParam (Query Params) {Number} [page] page number
 * @apiParam (Query Params) {Number} [limit] count limit of users to fetch
 * @apiParam (Query Params) {String} [sortBy] sort data by 'ASC' or 'DESC'
 * @apiParam (Query Params) {String} [field] order data depending on this field. Default value is 'lastName'
 *
 * @apiSuccess {Object[]} users All users
 * @apiSuccess {Number} users.userID ID of employee
 * @apiSuccess {String} users.employeeID employee ID
 * @apiSuccess {String} users.password password of employee
 * @apiSuccess {String} users.firstName first name of employee
 * @apiSuccess {String} users.middleName middle name of employee
 * @apiSuccess {String} users.lastName last name of employee
 * @apiSuccess {String} users.committee committee of employee, if exists
 * @apiSuccess {Boolean} users.isHead indicates if employee is head
 * @apiSuccess {String} users.officeNumber office number of employee
 * @apiSuccess {String} users.contractType contract type of employee
 * @apiSuccess {String} users.emailAddress email address of employee
 * @apiSuccess {String} users.rank rank of employee
 * @apiSuccess {Boolean} users.isArchived indicates if employee entry is archived
 * @apiSuccess {String} users.acctType account type of employee
 *
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *   {
 *    "status": 200,
 *    "message": "Successfully fetched users",
 *    "data": [
 *         {
 *             "userID": 1,
 *             "employeeID": "5121328320",
 *             "firstName": "Erlen Mae",
 *             "middleName": "S",
 *             "lastName": "Evangelista",
 *             "committee": null,
 *             "isHead": null,
 *             "officeNumber": "128",
 *             "contractType": "full-time",
 *             "emailAddress": "esevangelista1@up.edu.ph",
 *             "rank": null,
 *             "acctType": "USER"
 *         },
 *         {
 *             "userID": 6,
 *             "employeeID": "51111231223",
 *             "firstName": "Erl",
 *             "middleName": "S",
 *             "lastName": "Ocampo",
 *             "committee": null,
 *             "isHead": null,
 *             "officeNumber": "118",
 *             "contractType": "part-time",
 *             "emailAddress": "erl@up.edu.ph",
 *             "rank": null,
 *             "acctType": "USER"
 *         }
 *     ],
 *     "total": 2,
 *     "limit": 2,
 *     "page": 8,
 *     "pages": 8
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
 *   "message": "Users not found"
 * }
 */

router.get('/user/', async (req, res) => {
  try {
    const users = await Ctrl.getUsers(req.query);
    users.map(user => delete user.password);
    users.map(user => delete user.isArchived);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched users',
      data: users,
      total: (await Ctrl.getTotalUsers(req.query)).total,
      limit: parseInt(req.query.limit) || 12,
      page: parseInt(req.query.page) || 1,
      pages: Math.ceil(
        (await Ctrl.getTotalUsers(req.query)).total /
          (parseInt(req.query.limit) || 12),
      ),
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'User/s not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});
/**
 * @api {delete} /user/:userID deleteUser
 * @apiGroup User
 * @apiName deleteUser
 *
 * @apiParam (Query Params) {Number} userID ID of employee
 *
 * @apiSuccess {Object} user User user deleted
 * @apiSuccess {Number} user.userID ID of user
 * @apiSuccess {String} user.employeeID ID of employee
 * @apiSuccess {String} user.password password of employee
 * @apiSuccess {String} user.firstName first name of employee
 * @apiSuccess {String} user.middleName middle name of employee
 * @apiSuccess {String} user.lastName last name of employee
 * @apiSuccess {String} user.committee committee of employee, if exists
 * @apiSuccess {Boolean} user.isHead indicates if employee is head
 * @apiSuccess {String} user.officeNumber office number of employee
 * @apiSuccess {String} user.contractType contract type of employee
 * @apiSuccess {String} user.emailAddress email address of employee
 * @apiSuccess {String} user.rank rank of employee
 * @apiSuccess {Boolean} user.isArchived indicates if employee entry is archived
 * @apiSuccess {String} user.acctType account type of employee
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *   {
 *    "status": 200,
 *    "message": "Successfully deleted user",
 *    "data":
 *        {
 *          "userID": 3,
 *          "employeeID": "51111231223",
 *          "firstName": "Marie",
 *          "middleName": "S",
 *          "lastName": "Smith",
 *          "committee": null,
 *          "isHead": null,
 *          "officeNumber": "118",
 *          "contractType": "part-time",
 *          "emailAddress": "marieSmith@up.edu.ph",
 *          "rank": null,
 *          "isArchived": 0,
 *          "acctType": "USER"
 *         }
 *  }
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
 *   "message": "User not found"
 * }
 */
router.delete('/user/:userID', async (req, res) => {
  try {
    const user = await Ctrl.getUserByUserID(req.params);
    delete user.password;
    await Ctrl.deleteUser(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully deleted user',
      data: user,
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

/**
 * @api {get} /user/:employeeId getUser
 * @apiGroup User
 * @apiName getUser
 *
 * @apiParam (Query Params) {String} employeeID ID of employee
 *
 * @apiSuccess {Object} user User details
 * @apiSuccess {Number} user.userID ID of employee
 * @apiSuccess {String} user.employeeID ID of employee
 * @apiSuccess {String} user.firstName first name of employee
 * @apiSuccess {String} user.middleName middle name of employee
 * @apiSuccess {String} user.lastName last name of employee
 * @apiSuccess {String} user.committee committee of employee, if exists
 * @apiSuccess {Boolean} user.isHead indicates if employee is head
 * @apiSuccess {String} user.officeNumber office number of employee
 * @apiSuccess {String} user.contractType contract type of employee
 * @apiSuccess {String} user.emailAddress email address of employee
 * @apiSuccess {String} user.rank rank of employee
 * @apiSuccess {Boolean} user.isArchived indicates if employee entry is archived
 * @apiSuccess {String} user.acctType account type of employee
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "status":200,
 *     "message":"Successfully fetched user",
 *     "data":
 *        {
 *          "employeeID":"5121328320",
 *          "firstName":"Erlen Mae",
 *          "middleName":"S",
 *          "lastName":"Evangelista",
 *          "committee":null,
 *          "isHead":null,
 *          "officeNumber":"128",
 *          "contractType":"full-time",
 *          "emailAddress":"esevangelista1@up.edu.ph",
 *          "rank":null,
 *          "isArchived":0,
 *          "acctType":"USER"
 *        }
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
 *   "message": "User not found"
 * }
 */
router.get('/user/:employeeID', async (req, res) => {
  try {
    const user = await Ctrl.getUserByEmpID(req.params);
    delete user.password;
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched user',
      data: user,
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

router.use('/user/:userID', (req, res, next) => {
  const { user } = req.session;
  if (user && (user.acctType === 'ADMIN' || user.userID == req.params.userID)) {
    return next();
  }
  res.status(403).json({
    status: 403,
    message: 'Unauthorized access',
  });
});
/**
 * @api {put} /user/:userID updateUser
 * @apiGroup User
 * @apiName updateUser
 *
 * @apiParam (Query Params) {Number} userID ID of employee
 *
 * @apiParam (Body Params) {String} user.employeeID employee ID
 * @apiParam (Body Params) {String} password password of employee
 * @apiParam (Body Params) {String} firstName first name of employee
 * @apiParam (Body Params) {String} [middleName] middle name of employee
 * @apiParam (Body Params) {String} lastName last name of employee
 * @apiParam (Body Params) {String} [committee] committee of employee, if exists
 * @apiParam (Body Params) {Boolean} [isHead] indicates if employee is head
 * @apiParam (Body Params) {String} officeNumber office number of employee
 * @apiParam (Body Params) {String} contractType contract type of employee
 * @apiParam (Body Params) {String} emailAddress email address of employee
 * @apiParam (Body Params) {String} [rank] rank of employee
 * @apiParam (Body Params) {Boolean} [isArchived] indicates if employee entry is archived
 * @apiParam (Body Params) {String} [acctType] account type of employee
 *
 * @apiSuccess {Object} user User updated
 * @apiSuccess {String} user.userID ID of employee
 * @apiSuccess {String} user.employeeID employee ID
 * @apiSuccess {String} user.password password of employee
 * @apiSuccess {String} user.firstName first name of employee
 * @apiSuccess {String} user.middleName middle name of employee
 * @apiSuccess {String} user.lastName last name of employee
 * @apiSuccess {String} user.committee committee of employee, if exists
 * @apiSuccess {Boolean} user.isHead indicates if employee is head
 * @apiSuccess {String} user.officeNumber office number of employee
 * @apiSuccess {String} user.contractType contract type of employee
 * @apiSuccess {String} user.emailAddress email address of employee
 * @apiSuccess {String} user.rank rank of employee
 * @apiSuccess {Boolean} user.isArchived indicates if employee entry is archived
 * @apiSuccess {String} user.acctType account type of employee
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *        status: 200;
 *        message: 'Succesfully updated user'
 *        "data":
 *          {
 *               "userID": 3,
 *               "employeeID": "51111231223",
 *               "firstName": "Marie",
 *               "middleName": "S",
 *               "lastName": "Smith",
 *               "committee": Registration,
 *               "isHead": 1,
 *               "officeNumber": "118",
 *               "contractType": "part-time",
 *               "emailAddress": "marieSmith@up.edu.ph",
 *               "rank": 121,
 *               "isArchived": 0,
 *               "acctType": "USER"
 *           }
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
 *   "message": "User not found"
 * }
 */

router.put('/user/:userID', async (req, res) => {
  try {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }
    await Ctrl.updateUser(req.params, req.body);
    const user = await Ctrl.getUserByUserID(req.params);
    delete user.password;

    res.status(200).json({
      status: 200,
      message: 'Successfully updated user',
      data: user,
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
