import { formatQueryParams } from '../../utils';

export const addAward = `
  INSERT INTO award (
    id,
    awardID,
    grantF,
    chairGrantTitle,
    collegeHasNominated,
    recipientOrNominee,
    professionalChair,
    approvedStartDate,
    endDate,
    filepath
  )
  VALUES (
    :id,
    DEFAULT,
    :grantF,
    :chairGrantTitle,
    :collegeHasNominated,
    :recipientOrNominee,
    :professionalChair,
    :approvedStartDate,
    :endDate,
    :filepath
  )
`;

export const updateAward = award => `
  UPDATE award SET 
   ${formatQueryParams(award, 'update')}
  WHERE awardID = :awardID
`;

export const deleteAward = `
  DELETE FROM award
  WHERE awardID = :awardID
`;

export const getAward = `
  SELECT * FROM award
  WHERE awardID = :awardID
`;

export const getAwards = (query, sortBy) => `
 SELECT * FROM award ${
   query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
 }
  ORDER BY [field] ${
    sortBy === 'DESC' ? 'DESC' : 'ASC'
  } LIMIT :limit OFFSET :offset
`;

export const getTotalAwards = query => `
  SELECT count(*) as total FROM award ${
    query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
  }
`;
