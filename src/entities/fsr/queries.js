import { formatQueryParams } from '../../utils';

export const addFSR = `
  INSERT INTO fsr (
    userID, 
    acadYear, 
    semester
  )
  VALUES (
    :userID, 
    :acadYear, 
    :semester
  )
`;

export const updateFSR = fsr => `
  UPDATE fsr SET 
  ${formatQueryParams(fsr, 'update')}
  WHERE id = :id
`;

export const getFSR = `
  SELECT * from fsr
  WHERE id = :id 
`;

export const getFSRs = (query, sortBy) => `
  SELECT * FROM fsr ${
    query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
  } 
  ORDER BY [field] ${
    sortBy === 'DESC' ? 'DESC' : 'ASC'
  } LIMIT :limit OFFSET :offset
`;

export const getTotalFSRs = query => `
  SELECT count(*) as total FROM fsr ${
    query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
  }
`;
