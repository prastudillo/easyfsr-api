import { formatQueryParams } from '../../utils';

export const addTimeslot = `
	INSERT INTO timeslot (
		timeslotID,
		subjectID,
		day,
		timeStart,
		timeEnd
	)
	VALUES (
		DEFAULT,
		:subjectID,
		:day,
		:timeStart,
		:timeEnd
	)
`;

export const getTimeslots = (query, sortBy) => `
	SELECT * FROM timeslot ${
    query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
  } 
  	ORDER BY [field] ${sortBy === 'DESC' ? 'DESC' : 'ASC'} 
  	LIMIT :limit
  	OFFSET :offset
`;

export const getTimeslot = `
	SELECT *
	FROM timeslot
	WHERE timeslotID=:timeslotID
`;

export const updateTimeslot = timeslot => `
	UPDATE timeslot SET
	${formatQueryParams(timeslot, 'update')}
	WHERE timeslotID=:timeslotID
`;

export const deleteTimeslot = `
	DELETE FROM timeslot
	WHERE timeslotID = :timeslotID
`;

export const getTotalTimeslots = query => `
	SELECT COUNT(*) as total FROM timeslot ${
    query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
  } 
`;
