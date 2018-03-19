import * as Utils from '../../utils';
export const addTeachingLoad = `
	INSERT INTO teachingLoad ( 
		id, 
		teachingLoadCreds 
	)
	VALUES ( 
	:id, 
	:teachingLoadCreds 
	)
`;

export const updateTeachingLoad = teachingLoad => `
	UPDATE teachingLoad SET 
		${Utils.formatQueryParams(teachingLoad)}
		WHERE id = :id
`;

export const deleteTeachingLoad = `
	 DELETE FROM 
	 	teachingLoad 
	 WHERE id = :id
`;

export const getTeachingLoad = `
	SELECT *
	FROM teachingLoad
	WHERE id = :id
	ORDER BY id ASC
	LIMIT 10
`;

export const getAllTeachingLoad = `
  SELECT * from teachingLoad
`;
