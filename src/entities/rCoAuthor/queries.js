import { formatQueryParams } from '../../utils';

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
