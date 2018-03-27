import db from '../../database/index';
import * as Query from './queries';
import { filtered, escapeSearch } from '../../utils';

const fsrAttributes = [
  'userID',
  'acadYear',
  'semester',
  'isChecked',
  'teachingLoadCreds',
];

const searchFields = [
  'userID',
  'acadYear',
  'semester',
  'isChecked',
  'teachingLoadCreds',
];


export const addFSR = fsr => {
  return new Promise((resolve, reject) => {
    db.query(Query.addFSR, { ...fsr }, (err, results) => {
      console.log(err);
      if (err) return reject(500);
      return resolve(results.insertId);
    });
  });
};

export const updateFSR = ({ id }, fsr) => {
  return new Promise((resolve, reject) => {
    if (!fsr) return reject(500);
    db.query(
      Query.updateFSR(filtered(fsr, fsrAttributes)),
      { id, ...fsr },
      (err, results) => {
        if (err) return reject(500);
        return resolve(results.insertId);
      },
    );
  });
};

export const deleteFSR = ({ id }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.deleteFSR, { id }, (err, results) => {
      if (err) return reject(500);
      else if (!results.affectedRows) return reject(404);
      return resolve();
    });
  });
};

export const getFSR = ({ id }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.getFSR, { id }, (err, results) => {
      if (err) return reject(500);
      else if (!results.length) return reject(404);
      return resolve(results[0]);
    });
  });
};

export const getFSRs = fsr => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.getFSRs(filtered(fsr, fsrAttributes), fsr.sortBy),
      { field: 'isChecked', ...escapeSearch(fsr, searchFields, fsr.limit) },
      (err, results) => {
        if (err) return reject(500);
        return resolve(results);
      },
    );
  });
};

export const getTotalFSRs = () => {
  return new Promise((resolve, reject) => {
    db.query(Query.getTotalFSRs, (err, results) => {
      if (err) return reject(500);
      return resolve(results[0]);
    });
  });
};
