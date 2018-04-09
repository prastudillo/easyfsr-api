import { formatQueryParams } from '../../utils';

export const addSubject = `
	INSERT INTO subject (
		id,
		subjectCode,
		teachingLoadCreds,
		noOfStudents,
		hoursPerWeek,
		sectionCode,
		room
	)
	VALUES (
		:id,
		:subjectCode,
		:teachingLoadCreds,
		:noOfStudents,
		:hoursPerWeek,
		:sectionCode,
		:room
	)
`;

export const updateSubject = subject => `  			
	UPDATE subject SET
	${formatQueryParams(subject, 'update')}
	WHERE subjectID = :subjectID
`;

export const deleteSubject = `
	DELETE FROM subject
	WHERE subjectID = :subjectID
`;

export const getSubject = `
	SELECT *
	FROM subject
	WHERE subjectID = :subjectID
`;

export const getSubjects = (query, sortBy) => `
	SELECT * FROM subject ${
    query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
  } 
  	ORDER BY [field] ${sortBy === 'DESC' ? 'DESC' : 'ASC'} 
  	LIMIT :limit
`;

export const getTotalSubjects = query => `
	SELECT COUNT(*) as total FROM subject ${
    query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
  } 
`;
