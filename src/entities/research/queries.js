import { formatQueryParams } from '../../utils';

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
  	ORDER BY [field] ${
      sortBy === 'DESC' ? 'DESC' : 'ASC'
    } LIMIT :limit OFFSET :offset
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

export const getTotalResearches = query => `
	SELECT count(*) as total FROM research ${
    query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
  }
`;
