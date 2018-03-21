import { formatQueryParams } from '../../utils';

//done
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

//done
export const deleteResearch = `delete from research where researchID = :researchID`;

//done
// export const getAllResearch = `SELECT * FROM research WHERE id=:id`;

export const getAllResearch = query => `
  SELECT * from research ${
    query.length ? `WHERE ${formatQueryParams(query)}` : ''
  }
`;

//done
export const getAllResearchWithCoAuthor = `SELECT * FROM research NATURAL JOIN rCoAuthor where id = :id`;

//done
export const getResearch = `SELECT * FROM research WHERE researchID = :researchID`;

//done
export const getResearchWithCoAuthor = `SELECT * FROM research NATURAL JOIN rCoAuthor where id = :id AND researchID = :researchID`;

export const dropResearch = `DROP TABLE research`;

//done
export const addrCoAuthor = `INSERT INTO rCoAuthor ( researchID, userID ) VALUES (:researchID, :userID)`;

export const updaterCoAuthor = `UPDATE rCoAuthor 
  	SET userID=:userID
  	WHERE researchID=:researchID AND userID = :userID
`;
//done
export const deleterCoAuthor = `delete from rCoAuthor where userID = :userID AND researchID=:researchID`;

export const droprCoAuthor = `DROP TABLE rCoAuthor`;
