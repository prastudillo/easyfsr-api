import { formatQueryParams } from '../../utils';

export const addCworkCoAuthor = `
	INSERT INTO cworkCoAuthor (
		creativeWorkID,
		name
	)
	VALUES (
		:creativeWorkID,
		:name
	)
`;

export const updateCworkCoAuthor = cworkCoAuthor => `
	UPDATE cworkCoAuthor SET
	${formatQueryParams(cworkCoAuthor, 'update')}
	WHERE cworkCoAuthorID = :cworkCoAuthorID
`;

export const deleteCworkCoAuthor = `
	DELETE FROM cworkCoAuthor
	WHERE cworkCoAuthorID = :cworkCoAuthorID
`;

export const getCworkCoAuthor = `
	SELECT * FROM cworkCoAuthor
	WHERE cworkCoAuthorID = :cworkCoAuthorID
`;

export const getCworkCoAuthors = (query, sortBy) => `
	SELECT * FROM cworkCoAuthor ${
    query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
  }
	ORDER BY [field] ${
    sortBy === 'DESC' ? 'DESC' : 'ASC'
  } LIMIT :limit OFFSET :offset
`;

export const getTotalCworkCoAuthors = query => `
  SELECT count(*) as total FROM cworkCoAuthor ${
    query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
  }
`;
