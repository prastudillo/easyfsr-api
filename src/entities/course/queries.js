import { formatQueryParams } from '../../utils';

export const addCourse = `
	INSERT INTO course (
		id,
		courseNumber,
		courseID,
		hoursPerWeek,
		school,
		credit
	)
	VALUES (
		:id,
		:courseNumber,
		:courseID,
		:hoursPerWeek,
		:school,
		:credit
	)
`;


export const deleteCourse = `
	DELETE FROM course 
  where courseID = :courseID`;

export const getCourses = (query, sortBy) => `
  SELECT * FROM course ${
    query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
  }
  ORDER BY [field] ${sortBy === 'DESC' ? 'DESC' : 'ASC'} LIMIT :limit
`;
export const getCourse = `
  SELECT * FROM course 
  WHERE courseID=:courseID
`;

export const updateCourse = course =>  ` 
  UPDATE course SET  
    ${formatQueryParams(course, 'update')} 
  WHERE courseID=:courseID
`;

export const getTotalCourses = `
  SELECT count(*) as total FROM course
`;
