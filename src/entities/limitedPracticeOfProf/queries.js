import { formatQueryParams } from '../../utils';

export const addLtdPractOfProf = `
  INSERT INTO limitedPracticeOfProf (
    id,
    limitedPracticeOfProfID,
    askedPermission,
    date
  )
  VALUES (
    :id,
    DEFAULT,
    :askedPermission,
    :date
  )
`;

export const updateLtdPractOfProf = limitedPracticeOfProf => `
  UPDATE limitedPracticeOfProf SET
  ${formatQueryParams(limitedPracticeOfProf, 'update')}
  WHERE limitedPracticeOfProfID=:limitedPracticeOfProfID
`;

export const getLtdPractOfProfs = (query, sortBy) => `
  SELECT * FROM limitedPracticeOfProf ${
    query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
  } 
  ORDER BY [field] ${sortBy === 'DESC' ? 'DESC' : 'ASC'} 
  LIMIT :limit OFFSET :offset
`;

export const getLtdPractOfProf = `
  SELECT * FROM limitedPracticeOfProf
  WHERE limitedPracticeOfProfID = :limitedPracticeOfProfID
`;

export const deleteLtdPractOfProf = `
  DELETE FROM limitedPracticeOfProf WHERE limitedPracticeOfProfID = :limitedPracticeOfProfID
`;

export const getTotalLtdPractOfProfs = query => `
  SELECT count(*) as total FROM limitedPracticeOfProf ${
    query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
  }
`;
