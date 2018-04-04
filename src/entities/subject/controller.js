import db from '../../database/index';
import * as Query from './queries';
import { filtered, escapeSearch } from '../../utils';

const subjectAttributes = [
  'id',
  'subjectCode',
  'teachingLoadCreds',
  'noOfStudents',
  'hoursPerWeek',
  'sectionCode',
  'room',
];

const searchFields = [
  'subjectCode',
  'teachingLoadCreds',
  'noOfStudents',
  'hoursPerWeek',
  'sectionCode',
  'room',
];

export const addSubject = subject => {
  return new Promise((resolve, reject) => {
    db.query(Query.addSubject, subject, (err, results) => {
      if (err) return reject(500);
      return resolve(results.insertId);
    });
  });
};

export const updateSubject = ({ subjectID }, subject) => {
  return new Promise((resolve, reject) => {
    if (!subject) return reject(500);
    db.query(
      Query.updateSubject(filtered(subject, subjectAttributes)),
      { subjectID, ...subject },
      (err, results) => {
        if (err) return reject(500);
        return resolve(results.subjectID);
      },
    );
  });
};

export const deleteSubject = ({ subjectID }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.deleteSubject, { subjectID }, (err, results) => {
      if (err) return reject(500);
      else if (!results.affectedRows) return reject(404);
      return resolve(results.insertId);
    });
  });
};

export const getSubject = ({ subjectID }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.getSubject, { subjectID }, (err, results) => {
      if (err) return reject(500);
      else if (!results.length) return reject(404);
      return resolve(results);
    });
  });
};

export const getSubjects = subject => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.getSubjects(filtered(subject, subjectAttributes), subject.sortBy),
      {
        field: 'subjectCode',
        ...escapeSearch(subject, searchFields, subject.limit),
      },
      (err, results) => {
        if (err) return reject(500);
        return resolve(results);
      },
    );
  });
};

export const getTotalSubjects = subject => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.getTotalSubjects(filtered(subject, subjectAttributes)),
      {
        field: 'subjectCode',
        ...escapeSearch(subject, searchFields, subject.limit),
      },
      (err, results) => {
        if (err) return reject(500);
        return resolve(results[0]);
      },
    );
  });
};
