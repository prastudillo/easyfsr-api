import { formatQueryParams } from '../../utils';

/*********************************
 * 		Research Entity
 *********************************/
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
  	VALUES (
  		:id,
  		DEFAULT,
  		:type,
  		:role,
  		:title,
		:startDate,
		:endDate,
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
	WHERE researchID = :researchID
`;

export const updateResearch = research => `
	UPDATE research SET
		${formatQueryParams(research, 'update')}
	WHERE researchID=:researchID
`;

export const deleteResearch = `
	delete from research
	where researchID = :researchID
`;

export const getTotalResearches = `
	SELECT count(*) as total 
	FROM research
`;

export const getTotalResearchesByFSR = `
	SELECT count(*) as total 
	FROM research 
	WHERE id = :id 
`;

/****************************************
 * 		Research with CoAuthor Entity
 ****************************************/

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

export const getrCoAuthors = (query, sortBy) => `
	SELECT * FROM research NATURAL JOIN rCoAuthor ${
    query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
  } 
  	ORDER BY [field] ${sortBy === 'DESC' ? 'DESC' : 'ASC'} 
  	LIMIT :limit
`;

export const getrCoAuthor = `
	SELECT * FROM research NATURAL JOIN rCoAuthor
	where rCoAuthorID = :rCoAuthorID
`;

export const updaterCoAuthor = rCoAuthor => `
	UPDATE rCoAuthor SET
		${formatQueryParams(rCoAuthor, 'update')}
	WHERE rCoAuthorID = :rCoAuthorID
`;

export const deleterCoAuthor = `
	delete from rCoAuthor
	where rCoAuthorID = :rCoAuthorID
`;
