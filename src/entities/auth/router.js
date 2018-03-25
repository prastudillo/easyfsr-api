import { Router } from 'express';
import * as Ctrl from './controller';

const router = Router();

/**
 * @api {post} /login Login
 * @apiGroup Auth
 * @apiName Login
 *
 * @apiParam (Body Params) {String} emailAddress Email of the user.
 * @apiParam (Body Params) {String} password Password of the user.
 *
 * @apiSuccess {Object} user new User created
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
 *     "data": {
 *        "status": 200;
 *        "message": 'Succesfully logged in'
 *        "data":
 *          {
 *               "userID": 3,
 *               "employeeID": "51111231223",
 *               "firstName": "Marie",
 *               "middleName": "S",
 *               "lastName": "Smith",
 *               "committee": null,
 *               "isHead": null,
 *               "officeNumber": "118",
 *               "contractType": "part-time",
 *               "emailAddress": "marieSmith@up.edu.ph",
 *               "rank": null,
 *               "isArchived": 0,
 *               "acctType": "USER"
 *           }
 *     }
 *   }
 *
 * @apiError (Error 500) {String} status List of errors
 * @apiError (Error 500) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 * @apiError (Error 401) {String} status List of errors
 * @apiError (Error 401) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 401 Internal Server Error
 *   {
 *     "status": 401,
 *     "message": "Invalid credentials"
 *   }
 * @apiError (Error 404) {String} status List of errors
 * @apiError (Error 404) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 404 Internal Server Error
 *   {
 *     "status": 404,
 *     "message": "User not found"
 *   }
 */

router.post('/login', async (req, res) => {
  try {
    const user = await Ctrl.login(req.body);

    delete user.password;
    req.session.user = user;

    res.status(200).json({
      status: 200,
      message: 'Successfully logged in',
      data: user,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 500:
        message = 'Internal server error while logging in';
        break;
      case 401:
        message = 'Invalid credentials';
        break;
      case 404:
        message = 'User not found';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {post} /logout Logout
 * @apiGroup Auth
 * @apiName Logout
 */

router.post('/logout', async (req, res) => {
  try {
    await req.session.destroy();
    res.status(200).json();
  } catch (err) {
    res.status(500).json();
  }
});

/**
 * @api {post} /session Session
 * @apiGroup Auth
 * @apiName Session
 *
 * @apiSuccess {Object} user new User created
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
 *     "data": {
 *        "status": 200;
 *        "message": 'Succesfully logged in'
 *        "data":
 *          {
 *               "userID": 3,
 *               "employeeID": "51111231223",
 *               "firstName": "Marie",
 *               "middleName": "S",
 *               "lastName": "Smith",
 *               "committee": null,
 *               "isHead": null,
 *               "officeNumber": "118",
 *               "contractType": "part-time",
 *               "emailAddress": "marieSmith@up.edu.ph",
 *               "rank": null,
 *               "isArchived": 0,
 *               "acctType": "USER"
 *           }
 *     }
 *   }
 *
 */

router.post('/session', async (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Successfully fetched current session',
    data: req.session.user ? req.session.user : null,
  });
});

export default router;
