import { formatQueryParams } from '../../utils';

export const getAnnouncement = `
  SELECT * FROM announcement
  WHERE announcementID = :announcementID
`;

export const getAnnouncements = (query, sortBy) => `
  SELECT * FROM announcement ${
    query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
  } 
  ORDER BY [field] ${sortBy === 'DESC' ? 'DESC' : 'ASC'} 
  LIMIT :limit OFFSET :offset
`;

export const updateAnnouncement = announcement => `
  UPDATE announcement SET 
    ${formatQueryParams(announcement, 'update')}
  WHERE announcementID = :announcementID
`;

export const addAnnouncement = `
  INSERT INTO announcement ( 
    announcementID,
    userID,
    title,
    body
  )
  VALUES ( 
    DEFAULT,
    :userID,
    :title,
    :body
  )
`;

export const deleteAnnouncement = `
  UPDATE announcement SET
    isResolved = true
  WHERE announcementID = :announcementID
`;

export const getTotalAnnouncements = query => `
  SELECT count(*) as total FROM announcement ${
    query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
  }
`;
