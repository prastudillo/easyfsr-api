import db from '../../database/index';
import * as Query from './queries';
import { filtered, escapeSearch } from '../../utils';

const adminWorkAttributes = [
  'adminWorkID',
  'id',
  'position',
  'officeUnit',
  'approvedUnits',
];

const searchFields = [
  'adminWorkID',
  'position',
  'officeUnit',
  'approvedUnits',
  'id',
];

export const addAdminWork = adminWork => {
  return new Promise((resolve, reject) => {
    db.query(Query.addAdminWork, adminWork, (err, results) => {
      if (err) return reject(500);
      return resolve(results.insertId);
    });
  });
};

export const updateAdminWork = ({ adminWorkID }, adminWork) => {
  return new Promise((resolve, reject) => {
    if (!adminWork) return reject(500);
    db.query(
      Query.updateAdminWork(filtered(adminWork, adminWorkAttributes)),
      { adminWorkID, ...adminWork },
      (err, results) => {
        if (err) return reject(500);
        return resolve(results.insertId);
      },
    );
  });
};

export const deleteAdminWork = ({ adminWorkID }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.deleteAdminWork, { adminWorkID }, (err, results) => {
      if (err) return reject(500);
      else if (!results.affectedRows) return reject(404);
      return resolve();
    });
  });
};

export const getAdminWork = ({ adminWorkID }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.getAdminWork, { adminWorkID }, (err, results) => {
      if (err) return reject(500);
      else if (!results.length) return reject(404);
      return resolve(results[0]);
    });
  });
};

export const getAdminWorks = adminWork => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.getAdminWorks(
        filtered(adminWork, adminWorkAttributes),
        adminWork.sortBy,
      ),
      {
        field: 'position',
        ...escapeSearch(adminWork, searchFields, adminWork.limit),
      },
      (err, results) => {
        if (err) return reject(500);
        return resolve(results);
      },
    );
  });
};

export const getTotalAdminWorks = adminWork => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.getTotalAdminWorks(filtered(adminWork, adminWorkAttributes)),
      {
        field: 'position',
        ...escapeSearch(adminWork, searchFields, adminWork.limit),
      },
      (err, results) => {
        if (err) return reject(500);
        return resolve(results[0]);
      },
    );
  });
};
