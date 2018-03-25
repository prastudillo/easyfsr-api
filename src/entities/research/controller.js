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

const rCoAuthorAttributes = ['rCoAuthorID', 'userID', 'researchID'];

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

export const addrCoAuthor = rCoAuthor => {
  return new Promise((resolve, reject) => {
    db.query(Query.addrCoAuthor, { ...rCoAuthor }, (err, results) => {
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

export const updaterCoAuthor = ({ rCoAuthorID }, rCoAuthor) => {
  return new Promise((resolve, reject) => {
    if (!rCoAuthor) return reject(500);
    db.query(
      Query.updaterCoAuthor(filtered(rCoAuthor, rCoAuthorAttributes)),
      { rCoAuthorID, ...rCoAuthor },
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

export const getrCoAuthor = ({ rCoAuthorID }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.getrCoAuthor, { rCoAuthorID }, (err, results) => {
      if (err) return reject(500);
      return resolve(results);
    });
  });
};

export const getrCoAuthors = rCoAuthor => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.getrCoAuthors(
        filtered(rCoAuthor, rCoAuthorAttributes),
        rCoAuthor.sortBy,
      ),
      {
        field: 'researchID',
        ...escapeSearch(rCoAuthor, searchFields, rCoAuthor.limit),
      },
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

export const deleterCoAuthor = ({ rCoAuthorID }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.deleterCoAuthor, { rCoAuthorID }, (err, results) => {
      if (err) return reject(500);
      return resolve();
    });
  });
};
