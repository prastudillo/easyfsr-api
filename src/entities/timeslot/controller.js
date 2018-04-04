import db from '../../database/index';
import * as Query from './queries';
import { filtered, escapeSearch } from '../../utils';

const timeslotAttributes = ['subjectID', 'day', 'timeStart', 'timeEnd'];

const searchFields = ['day', 'timeStart', 'timeEnd'];

export const addTimeslot = timeslot => {
  return new Promise((resolve, reject) => {
    db.query(Query.addTimeslot, timeslot, (err, results) => {
      if (err) return reject(500);
      return resolve(results.insertId);
    });
  });
};

export const getTimeslots = timeslot => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.getTimeslots(
        filtered(timeslot, timeslotAttributes),
        timeslot.sortBy,
      ),
      {
        field: 'day',
        ...escapeSearch(timeslot, searchFields, timeslot.limit),
      },
      (err, results) => {
        if (err) return reject(500);
        return resolve(results);
      },
    );
  });
};

export const getTimeslot = ({ timeslotID }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.getTimeslot, { timeslotID }, (err, results) => {
      if (err) return reject(500);
      else if (!results.length) return reject(404);
      return resolve(results[0]);
    });
  });
};

export const updateTimeslot = ({ timeslotID }, timeslot) => {
  return new Promise((resolve, reject) => {
    if (!timeslot) return reject(500);
    db.query(
      Query.updateTimeslot(filtered(timeslot, timeslotAttributes)),
      { timeslotID, ...timeslot },
      (err, results) => {
        if (err) return reject(500);
        return resolve(results.insertId);
      },
    );
  });
};

export const deleteTimeslot = ({ timeslotID }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.deleteTimeslot, { timeslotID }, (err, results) => {
      if (err) return reject(500);
      else if (!results.affectedRows) return reject(404);
      return resolve();
    });
  });
};

export const getTotalTimeslots = timeslot => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.getTotalTimeslots(filtered(timeslot, timeslotAttributes)),
      {
        field: 'day',
        ...escapeSearch(timeslot, searchFields, timeslot.limit),
      },
      (err, results) => {
        if (err) return reject(500);
        return resolve(results[0]);
      },
    );
  });
};
