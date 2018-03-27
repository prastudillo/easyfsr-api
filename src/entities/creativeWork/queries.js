import { formatQueryParams } from '../../utils';

// CREATIVE WORK
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
	WHERE id = :id AND creativeWorkID = :creativeWorkID;
`;

export const deleteCreativeWork = `
	DELETE FROM creativeWork
	WHERE creativeWorkID = :creativeWorkID AND id = :id
`;

export const getAllCreativeWork = query => `
	SELECT * FROM creativeWork
	NATURAL JOIN cworkCoAuthor
	ORDER BY id ASC
	LIMIT 10
`;

export const getCreativeWorks = (query, sortBy) => `
	SELECT * FROM creativeWork ${
    query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
  }
	ORDER BY [field] ${sortBy === 'DESC' ? 'DESC' : 'ASC'} 
	LIMIT :limit
`;

export const getCreativeWork = `
	SELECT * FROM creativeWork NATURAL JOIN cworkCoAuthor
	WHERE id = :id AND creativeWorkID = :creativeWorkID
`;

export const getTotalCreativeWorks = `
	SELECT count(*) as total FROM creativeWork
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
