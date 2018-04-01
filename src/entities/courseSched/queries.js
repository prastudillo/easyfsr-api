import { formatQueryParams } from '../../utils';

export const addCourseSched = ` INSERT INTO courseSched 
	(
    courseID,
 	 	day,
	  timeStart,
    timeEnd
	) 
	VALUES 
	(
		:courseID,
    :day,
		:timeStart,
    :timeEnd
	)`;

export const updateCourseSched = courseSched =>
  `UPDATE courseSched SET ${formatQueryParams(
    courseSched,
  )} WHERE courseSchedID = :courseSchedID`;

export const deleteCourseSched = `
  DELETE from courseSched 
  WHERE courseSchedID = :courseSchedID
`;

export const getCourseSched = `
  SELECT * FROM courseSched 
  WHERE courseSchedID = :courseSchedID
`;

export const getCourseScheds = (query, sortBy) => `
  SELECT * FROM courseSched ${
    query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
  }
  ORDER BY [field] ${
    sortBy === 'DESC' ? 'DESC' : 'ASC'
  } LIMIT :limit OFFSET :offset

`;

export const getTotalCourseScheds = query => `
  SELECT count(*) as total FROM courseSched ${
    query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
  }
`;
