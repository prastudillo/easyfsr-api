import db from '../../database/index';
import * as Query from './queries';
import { filtered } from '../../utils';

const researchAttributes = [
  'id',
  'researchID',
  'type',
  'role',
  'title',
  'startDate',
  'endDate',
  'funding',
  'approvedUnits',
];

export const addResearch = research => {
  return new Promise((resolve, reject) => {
    db.query(Query.addResearch, { ...research }, (err, results) => {
      console.log(err);
      if (err) return reject(500);
      return resolve(results.insertId);
    });
  });
};

export const updateResearch = ({ researchID }, research) => {
  return new Promise((resolve, reject) => {
    if (!research) return reject(500);
    db.query(
      Query.updateResearch(filtered(research, researchAttributes)),
      { researchID, ...research },
      (err, results) => {
        console.log(err);
        if (err) return reject(500);
        return resolve(results.insertId);
      },
    );
  });
};

export const deleteResearch = ({ researchID }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.deleteResearch, { researchID }, (err, results) => {
      if (err) return reject(500);
      // else if (!results.changedRows) return reject(404);
      return resolve();
    });
  });
};

export const getResearch = ({ researchID }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.getResearch, { researchID }, (err, results) => {
      console.log('err: ' + err);
      if (err) return reject(500);
      return resolve(results);
    });
  });
};

export const getAllResearch = research => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.getAllResearch(filtered(research, researchAttributes)),
      research,
      (err, results) => {
        if (err) return reject(500);
        else if (!results.length) return reject(404);
        return resolve(results);
      },
    );
  });
};
