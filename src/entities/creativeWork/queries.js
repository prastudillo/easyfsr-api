import { formatQueryParams } from '../../utils';

export const addCreativeWork = `
	INSERT INTO creativeWork (
		id,
		creativeWorkID,
		date,
		title,
		type,
		credUnit
	)
	VALUES (
		:id,
		DEFAULT,
		:date,
		:title,
		:type,
		:credUnit
	)
`;

export const updateCreativeWork = creativeWork => `
	UPDATE creativeWork SET
	${formatQueryParams(creativeWork, 'update')}
	WHERE creativeWorkID = :creativeWorkID
`;

export const deleteCreativeWork = `
	DELETE FROM creativeWork
	WHERE creativeWorkID = :creativeWorkID
`;

export const getCreativeWorks = (query, sortBy) => `
	SELECT * FROM creativeWork ${
    query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
  }
	ORDER BY [field] ${
    sortBy === 'DESC' ? 'DESC' : 'ASC'
  } LIMIT :limit OFFSET :offset
`;

export const getCreativeWork = `
	SELECT * FROM creativeWork
	WHERE creativeWorkID = :creativeWorkID
`;

export const getTotalCreativeWorks = query => `
	SELECT count(*) as total FROM creativeWork ${
    query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
  }
`;

export const getTotalCreativeWorksByFSR = `
	SELECT count(*) as total FROM creativeWork WHERE id = :id
`;

// CREATIVE WORK CO AUTHOR
export const addCoAuthor = `
	INSERT INTO cworkCoAuthor (
		creativeWorkID,
		userID,
		cworkCoAuthorID
	)
	VALUES (
		:creativeWorkID,
		:userID,
		DEFAULT
	)
`;

export const updateCoAuthor = `
	UPDATE cworkCoAuthor SET
		userID = :userID
	WHERE creativeWorkID = :creativeWorkID
`;

export const deleteCoAuthor = `
	DELETE FROM cworkCoAuthor
	WHERE userID = :userID
`;
