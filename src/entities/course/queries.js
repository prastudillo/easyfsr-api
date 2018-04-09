import { formatQueryParams } from '../../utils';

export const addCourse = `
	INSERT INTO course (
		id,
		courseNumber,
		hoursPerWeek,
		school,
		credit
	)
	VALUES (
		:id,
		:courseNumber,
		:hoursPerWeek,
		:school,
		:credit
	)
`;

export const updateCourse = course => ` 
  UPDATE course SET  
    ${formatQueryParams(course, 'update')} 
  WHERE courseID = :courseID
`;

export const deleteCourse = `
	DELETE FROM course 
  where courseID = :courseID
`;

export const getCourse = `
  SELECT * FROM course 
  WHERE courseID = :courseID
`;

export const getCourses = (query, sortBy) => `
  SELECT * FROM course ${
    query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
  }
  ORDER BY [field] ${sortBy === 'DESC' ? 'DESC' : 'ASC'} LIMIT :limit
`;

export const getTotalCourses = query => `
  SELECT count(*) as total FROM course ${
    query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
  }
`;
