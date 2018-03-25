import db from '../../database/index';
import * as Query from './queries';
import { filtered, escapeSearch } from '../../utils';

const limitedPracticeOfProfAttributes = ['id', 'askedPermission', 'Date'];

export const getLimitedPracticeOfProf = ({ id }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.getLimitedPracticeOfProf, { id }, (err, results) => {
      if (err) return reject(500);
      else if (!results.length) return reject(404);
      return resolve(results);
    });
  });
};
