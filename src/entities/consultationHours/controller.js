import db from '../../database/index';
import * as Query from './queries';
import { filtered, escapeSearch } from '../../utils';

const consultationHoursAttributes = [
  'chID',
  'id',
  'place',
  'day',
  'timeStart',
  'timeEnd',
];
const fields = ['id', 'place', 'day', 'timeStart', 'timeEnd'];

export const addConsultationHour = consultationHours => {
  return new Promise((resolve, reject) => {
    db.query(Query.addConsultationHour, consultationHours, (err, results) => {
      console.log(err);
      if (err) return reject(500);
      return resolve(results.insertId);
    });
  });
};

export const updateConsultationHour = ({ chID }, consultationHour) => {
  return new Promise((resolve, reject) => {
    if (!consultationHour) return reject(500);
    db.query(
      Query.updateConsultationHour(
        filtered(consultationHour, consultationHoursAttributes),
      ),
      { chID, ...consultationHour },
      (err, results) => {
        console.log(err);
        if (err) return reject(500);
        return resolve(results.insertId);
      },
    );
  });
};

export const deleteConsultationHour = ({ chID }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.deleteConsultationHour, { chID }, (err, results) => {
      console.log(err);
      if (err) return reject(500);
      else if (!results.affectedRows) return reject(404);
      return resolve();
    });
  });
};

export const getConsultationHour = ({ chID }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.getConsultationHour, { chID }, (err, results) => {
      console.log(results);
      if (err) return reject(500);
      else if (!results.length) return reject(404);
      return resolve(results);
    });
  });
};

export const getConsultationHours = consultationHours => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.getConsultationHours(
        filtered(consultationHours, consultationHoursAttributes),
        consultationHours.sortBy,
      ),

      {
        field: 'id',
        ...escapeSearch(consultationHours, fields, consultationHours.limit),
      },

      (err, results) => {
        console.log(results);
        if (err) return reject(500);
        else if (!results.length) return reject(404);
        return resolve(results);
      },
    );
  });
};
