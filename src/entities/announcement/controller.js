import db from '../../database/index';
import * as Query from './queries';
import { filtered, escapeSearch } from '../../utils';

const announcementAttributes = ['userID', 'title', 'body', 'isResolved'];

const searchFields = ['userID', 'title', 'body', 'isResolved'];

export const addAnnouncement = announcement => {
  return new Promise((resolve, reject) => {
    db.query(Query.addAnnouncement, announcement, (err, results) => {
      if (err) return reject(500);
      return resolve(results.insertId);
    });
  });
};

export const updateAnnouncement = ({ announcementID }, announcement) => {
  return new Promise((resolve, reject) => {
    if (!announcement) return reject(500);
    db.query(
      Query.updateAnnouncement(filtered(announcement, announcementAttributes)),
      { announcementID, ...announcement },
      (err, results) => {
        if (err) return reject(500);
        return resolve(results.insertId);
      },
    );
  });
};

export const getAnnouncement = ({ announcementID }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.getAnnouncement, { announcementID }, (err, results) => {
      if (err) return reject(500);
      else if (!results.length) return reject(404);
      return resolve(results[0]);
    });
  });
};

export const getAnnouncements = announcement => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.getAnnouncements(
        filtered(announcement, announcementAttributes),
        announcement.sortBy,
      ),
      {
        field: 'title',
        ...escapeSearch(announcement, searchFields, announcement.limit),
      },
      (err, results) => {
        if (err) return reject(500);
        return resolve(results);
      },
    );
  });
};

export const getTotalAnnouncements = announcement => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.getTotalAnnouncements(
        filtered(announcement, announcementAttributes),
      ),
      {
        field: 'title',
        ...escapeSearch(announcement, searchFields, announcement.limit),
      },
      (err, results) => {
        if (err) return reject(500);
        return resolve(results[0]);
      },
    );
  });
};

export const deleteAnnouncement = ({ announcementID }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.deleteAnnouncement, { announcementID }, (err, results) => {
      if (err) return reject(500);
      else if (!results.affectedRows) return reject(404);
      return resolve();
    });
  });
};
