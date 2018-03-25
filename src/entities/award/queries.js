import { formatQueryParams } from '../../utils';

export const addAward = `
  INSERT INTO award ( 
    id,
    grantF,
    chairGrantTitle,
    collegeHasNominated,
    recipientOrNominee,
    professionalChair,
    approvedStartDate,
    endDate 
  )
  VALUES ( 
    :id,
    :grantF,
    :chairGrantTitle,
    :collegeHasNominated,
    :recipientOrNominee,
    :professionalChair,
    :approvedStartDate,
    :endDate
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
  ORDER BY [field] ${sortBy === 'DESC' ? 'DESC' : 'ASC'} LIMIT :limit
`;
