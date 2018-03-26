import db from '../../database/index';
import * as Query from './queries';
import { filtered, escapeSearch } from '../../utils';

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

const searchFields = [
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
        if (err) return reject(500);
        return resolve(results.insertId);
      },
    );
  });
};

export const getResearch = ({ researchID }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.getResearch, { researchID }, (err, results) => {
      if (err) return reject(500);
      return resolve(results);
    });
  });
};

export const getResearches = research => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.getResearches(
        filtered(research, researchAttributes),
        research.sortBy,
      ),
      {
        field: 'type',
        ...escapeSearch(research, searchFields, research.limit),
      },
      (err, results) => {
        if (err) return reject(500);
        return resolve(results);
      },
    );
  });
};

export const getTotalResearches = research => {
  return new Promise((resolve, reject) => {
    db.query(Query.getTotalResearches, { ...research }, (err, results) => {
      if (err) return reject(500);
      return resolve(results);
    });
  });
};

export const getTotalResearchesByFSR = ({ id }, research) => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.getTotalResearchesByFSR,
      { id, ...research },
      (err, results) => {
        if (err) return reject(500);
        return resolve(results);
      },
    );
  });
};

export const deleteResearch = ({ researchID }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.deleteResearch, { researchID }, (err, results) => {
      if (err) return reject(500);
      return resolve();
    });
  });
};
