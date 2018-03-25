import { formatQueryParams } from '../../utils';

export const addLimitedPracticeOfProf = `
  INSERT INTO limitedPracticeOfProf ( 
    id,
    askedPermission,
    date 
  )
  VALUES ( 
    :id,
    :askedPermission,
    :date
  )
`;

export const updateLimitedPracticeOfProf = limitedPracticeOfProf => `
  UPDATE limitedPracticeOfProf SET
  ${formatQueryParams(limitedPracticeOfProf, 'update')}
  WHERE id = :id;
`;

// export const updateLimitedPracticeOfProf = `
//   UPDATE limitedPracticeOfProf SET
//     askedPermission=:askedPermission,
//     date=:date
//   WHERE id=DEFAULT
// `;

export const getLimitedPracticeOfProf = `
  SELECT * FROM limitedPracticeOfProf
  WHERE id = :id
  ORDER BY id ASC
  LIMIT 10;
`;

export const getAllLimitedPracticeOfProf = (query, sortBy) => `
  SELECT * FROM limitedPracticeOfProf ${
    query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
  }
    ORDER BY [field] ${sortBy === ASC}
`;

export const deleteLimitedPracticeOfProf = `
  DELETE FROM limitedPracticeOfProf
  WHERE id = :id
`;
