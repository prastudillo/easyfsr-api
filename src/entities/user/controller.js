import db from '../../database/index';

import * as Query from './queries';

export const addUser = user => {
  return new Promise((resolve, reject) => {
    db.query(Query.addUser, user, (err, results) => {
      if (err) return reject(500);
      return resolve(results.insertId);
    });
  });
};

export const updateUser = ({ employeeID }, user) => {
  return new Promise((resolve, reject) => {
    db.query(Query.updateUser, { ...user, employeeID }, (err, results) => {
      if (err) return reject(500);
      return resolve(results.insertId);
    });
  });
};

export const deleteUser = ({ employeeID }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.deleteUser, { employeeID }, (err, results) => {
      if (err) return reject(500);
      return resolve(employeeID);
    });
  });
};
