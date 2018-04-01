import { formatQueryParams } from '../../utils';

export const addReseach = `
	INSERT INTO research (
		id,
		researchID,
		type,
		role,
		title,
		startDate,
		funding,
		approvedUnits
	)
  	VALUES (
  		:id,
  		DEFAULT,
  		:type,
  		:role,
  		:title,
  		:startDate,
  		:funding,
  		:approvedUnits
  	)
`;

export const getResearches = (query, sortBy) => `
	SELECT * FROM research ${
    query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
  } 
  	ORDER BY [field] ${sortBy === 'DESC' ? 'DESC' : 'ASC'} 
  	LIMIT :limit
`;

export const getResearch = `
	SELECT * FROM research
	WHERE id=:id AND researchID = :researchID
`;

export const updateResearch = research => `
	UPDATE research SET
		${formatQueryParams(research, 'update')}
	WHERE id=:id and researchID=:researchID
`;

export const deleteResearch = `
	delete from research
	where id=:id AND researchID = :researchID
`;

export const getTotalResearches = `
	SELECT count(*) as total FROM research
`;

export const getTotalResearchesByFSR = `
	SELECT count(*) as total FROM research WHERE id = :id 
`;

/*

// Supports deleting single or multiple rows at the same time 

export const deleteResearches = query =>`
	DELETE FROM research
	${query.length ? `WHERE ${formatQueryParams(query)}` : ''}
`
*/

export const getResearchesWithCoAuthor = query => `
	SELECT * FROM research NATURAL JOIN rCoAuthor ${
    query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
  } 
  	ORDER BY [field] ${sortBy === 'DESC' ? 'DESC' : 'ASC'} 
  	LIMIT :limit
`;

export const getResearchWithCoAuthor = `
	SELECT * FROM research NATURAL JOIN rCoAuthor
	where id = :id AND researchID = :researchID
`;

export const addrCoAuthor = `
	INSERT INTO rCoAuthor (
		researchID,
		userID,
		rCoAuthorID
	)
	VALUES (
		:researchID,
		:userID,
		DEFAULT
	)
`;

export const updaterCoAuthor = `
	UPDATE rCoAuthor SET
		userID=:userID
  	WHERE researchID=:researchID AND userID = :userID
`;

export const deleterCoAuthor = `
	delete from rCoAuthor
	where userID = :userID AND researchID=:researchID
`;
