import { formatQueryParams } from '../../utils';

export const addTimeslot = `
	INSERT INTO timeslot (
		timeslotID,
		subjectID,
		day,
		time
	)
	VALUES (
		DEFAULT,
		:subjectID,
		:day,
		:time
	)
`;

export const getTimeslots = query => `
	SELECT * FROM timeslot
	${query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''}	
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
