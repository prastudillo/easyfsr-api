import db from '../../database/index';
import * as Query from './queries';
import { filtered, escapeSearch } from '../../utils';

const LtdPractAttributes = [
  'id',
  'limitedPracticeOfProfID',
  'askedPermission',
  'date',
];

const searchFields = [
  'id',
  'limitedPracticeOfProfID',
  'askedPermission',
  'date',
];

export const addLtdPractOfProf = limitedPracticeOfProf => {
  return new Promise((resolve, reject) => {
    db.query(Query.addLtdPractOfProf, limitedPracticeOfProf, (err, results) => {
      if (err) return reject(500);
      return resolve(results.insertId);
    });
  });
};

export const updateLtdPractOfProf = (
  { limitedPracticeOfProfID },
  limitedPracticeOfProf,
) => {
  return new Promise((resolve, reject) => {
    if (!limitedPracticeOfProf) return reject(500);
    db.query(
      Query.updateLtdPractOfProf(
        filtered(limitedPracticeOfProf, LtdPractAttributes),
      ),
      { limitedPracticeOfProfID, ...limitedPracticeOfProf },
      (err, results) => {
        if (err) return reject(500);
        return resolve(results.insertId);
      },
    );
  });
};

export const getLtdPractOfProf = ({ limitedPracticeOfProfID }) => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.getLtdPractOfProf,
      { limitedPracticeOfProfID },
      (err, results) => {
        if (err) return reject(500);
        else if (!results.length) return reject(404);
        return resolve(results[0]);
      },
    );
  });
};

export const deleteLtdPractOfProf = ({ limitedPracticeOfProfID }) => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.deleteLtdPractOfProf,
      { limitedPracticeOfProfID },
      (err, results) => {
        console.log(err);
        if (err) return reject(500);
        else if (!results.affectedRows) return reject(404);
        return resolve();
      },
    );
  });
};

export const getLtdPractOfProfs = limitedPracticeOfProf => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.getLtdPractOfProfs(
        filtered(limitedPracticeOfProf, LtdPractAttributes),
        limitedPracticeOfProf.sortBy,
      ),
      {
        field: 'id',
        ...escapeSearch(
          limitedPracticeOfProf,
          searchFields,
          limitedPracticeOfProf.limit,
        ),
      },
      (err, results) => {
        if (err) return reject(500);
        return resolve(results);
      },
    );
  });
};
export const getTotalLtdPractOfProfs = limitedPracticeOfProf => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.getTotalLtdPractOfProfs(
        filtered(limitedPracticeOfProf, LtdPractAttributes),
      ),
      {
        field: 'id',
        ...escapeSearch(
          limitedPracticeOfProf,
          searchFields,
          limitedPracticeOfProf.limit,
        ),
      },
      (err, results) => {
        if (err) return reject(500);
        return resolve(results[0]);
      },
    );
  });
};
