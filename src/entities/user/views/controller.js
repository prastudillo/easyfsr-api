import db from '../../../database';
import * as Query from './queries';

export const getUserAwards = query => {
  return new Promise((resolve, reject) => {
    db.query(Query.getAwards, query, (err, results) => {
      if (err) return reject(500);
      else return resolve(results);
    });
  });
};

export const getUserResearch = query => {
  return new Promise((resolve, reject) => {
    db.query(Query.getResearch, query, (err, results) => {
      if (err) return reject(500);
      else return resolve(results);
    });
  });
};

export const getUserAdminWork = query => {
  return new Promise((resolve, reject) => {
    db.query(Query.getAdminWork, query, (err, results) => {
      if (err) return reject(500);
      else return resolve(results);
    });
  });
};

export const getUserConsultationHours = query => {
  return new Promise((resolve, reject) => {
    db.query(Query.getConsultationHours, query, (err, results) => {
      if (err) return reject(500);
      else return resolve(results);
    });
  });
};

export const getUserSLCourse = query => {
  return new Promise((resolve, reject) => {
    db.query(Query.getSLCourse, query, (err, results) => {
      if (err) return reject(500);
      else return resolve(results);
    });
  });
};

export const getUserSubject = query => {
  return new Promise((resolve, reject) => {
    db.query(Query.getSubject, query, (err, results) => {
      if (err) return reject(500);
      else return resolve(results);
    });
  });
};

export const getUserStudyLoad = query => {
  return new Promise((resolve, reject) => {
    db.query(Query.getStudyLoad, query, (err, results) => {
      if (err) return reject(500);
      else return resolve(results);
    });
  });
};

export const getUserExtensionAndCommunityService = query => {
  return new Promise((resolve, reject) => {
    db.query(Query.getExtensionAndCommunityService, query, (err, results) => {
      if (err) return reject(500);
      else return resolve(results);
    });
  });
};

export const getUserLimitedPractice = query => {
  return new Promise((resolve, reject) => {
    db.query(Query.getLimitedPracticeOfProf, query, (err, results) => {
      if (err) return reject(500);
      else return resolve(results);
    });
  });
};

export const getUserCreativeWork = query => {
  return new Promise((resolve, reject) => {
    db.query(Query.getCreativeWork, query, (err, results) => {
      if (err) return reject(500);
      else return resolve(results);
    });
  });
};
