import db from '../../database/index';
import * as Query from './queries';
import { filtered } from '../../utils';
import * as Utils from '../../utils';

const teachingLoadAttributes = ['teachingLoadCreds'];

export const addTeachingLoad = teachingLoad => {
  return new Promise((resolve, reject) => {
    db.query(Query.addTeachingLoad, { ...teachingLoad }, (err, results) => {
      if (err) return reject(500);
      return resolve(results.insertId);
    });
  });
};

export const updateTeachingLoad = ({ id }, teachingLoad) => {
  return new Promise((resolve, reject) => {
    if (!teachingLoad) return reject(500);
    db.query(
      Query.updateTeachingLoad(filtered(teachingLoad, teachingLoadAttributes)),
      { id, ...teachingLoad },
      (err, results) => {
        if (err) return reject(500);
        //else if (!results.length) return reject(404);
        return resolve(results.insertId);
      },
    );
  });
};

export const deleteTeachingLoad = ({ id }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.deleteTeachingLoad, { id }, (err, results) => {
      if (err) return reject(500);
      else if (!results.affectedRows) return reject(404);
      return resolve();
    });
  });
};

export const getTeachingLoad = ({ id }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.getTeachingLoad, { id }, (err, results) => {
      if (err) return reject(500);
      return resolve(results);
    });
  });
};

export const getAllTeachingLoad = () => {
  return new Promise((resolve, reject) => {
    db.query(Query.getAllTeachingLoad, (err, results) => {
      if (err) return reject(500);
      else if (!results.length) return reject(404);
      return resolve(results);
    });
  });
};
