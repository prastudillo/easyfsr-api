import { formatQueryParams } from '../../utils';

/*************************
 * Research CRUD
 *************************/

export const addResearch = `
  INSERT INTO research (
    id, 
    researchID, 
    type, 
    role, 
    title, 
    startDate, 
    endDate, 
    funding,
    approvedUnits
  )
  VALUES ( :id, :researchID, :type, :role, :title, :startDate, :endDate, :funding, :approvedUnits )`;

export const updateResearch = research => `
  UPDATE research SET
  ${formatQueryParams(research)}
  WHERE researchID = :researchID
`;

export const deleteResearch = `
  DELETE from research 
  WHERE researchID = :researchID
`;

export const getResearches = (query, sortBy) => `
  SELECT * from research ${
    query.length ? `WHERE ${formatQueryParams(query)}` : ''
  }
  ORDER BY [field] ${sortBy === 'DESC' ? 'DESC' : 'ASC'} LIMIT :limit
`;

export const getResearch = `
  SELECT * FROM research 
  WHERE researchID = :researchID
`;

export const dropResearch = `
  DROP TABLE research
`;

/********************************
 * Research With CoWorker CRUD
 ********************************/

export const addrCoAuthor = `
  INSERT INTO rCoAuthor ( 
    researchID, 
    userID 
  ) 
  VALUES (
    :researchID, 
    :userID
  )
`;

export const getResearchesWithCoAuthor = (query, sortBy) => `
  SELECT * from rCoAuthor ${
    query.length ? `WHERE ${formatQueryParams(query)}` : ''
  }
  ORDER BY [field] ${sortBy === 'DESC' ? 'DESC' : 'ASC'} LIMIT :limit
`;

//done
export const getResearchWithCoAuthor = `
  SELECT * FROM research NATURAL JOIN rCoAuthor 
  WHERE id = :id AND researchID = :researchID
`;

export const updaterCoAuthor = `
  UPDATE rCoAuthor 
  SET userID=:userID
  WHERE researchID=:researchID AND userID = :userID
`;

//done
export const deleterCoAuthor = `
  DELETE from rCoAuthor 
  WHERE userID = :userID AND researchID=:researchID
`;

export const droprCoAuthor = `DROP TABLE rCoAuthor`;
