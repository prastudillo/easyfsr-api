import { formatQueryParams } from '../../utils';

export const addrCoAuthor = `
	INSERT INTO rCoAuthor (
		researchID,
		rCoAuthorID,
		name
	)
	VALUES (
		:researchID,
		DEFAULT,
		:name
	)
`;

export const getrCoAuthors = (query, sortBy) => `
	SELECT * FROM research NATURAL JOIN rCoAuthor ${
    query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
  } 
  	ORDER BY [field] ${
      sortBy === 'DESC' ? 'DESC' : 'ASC'
    } LIMIT :limit OFFSET :offset
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

export const getTotalrCoAuthors = query => `
	SELECT count(*) as total FROM rCoAuthor ${
    query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
  }
`;
