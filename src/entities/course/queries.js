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

export const updateCourse = `
	UPDATE course SET 
		hoursPerWeek=:hoursPerWeek, 
		school=:school, 
		credit=:credit 
	WHERE courseID=:courseID AND id=:id
`;

export const deleteCourse = `
	DELETE FROM course where courseID = :courseID`;

export const getAllCourse = `
	SELECT * FROM course 
	where id=:id
`;

export const getAllCourseWithSched = `
	SELECT * FROM course NATURAL JOIN courseSched 
	WHERE id=:id 
	ORDER BY courseID ASC
	LIMIT 10
`;

export const getCourseWithSched = `
	SELECT * FROM course NATURAL JOIN courseSched 
	WHERE id=:id AND courseID=:courseID
`;

export const dropCourse = `
	DROP TABLE course
`;

export const addCourseSched = `
	INSERT INTO courseSched ( 
		courseID, 
		day, 
		time 
	) 
	VALUES ( 
		:courseID, 
		:day, 
		:time 
	);
`;

export const updateCourseSched = `
	UPDATE courseSched SET 
		day= :day, 
		time=:time  
	WHERE courseID=:courseID AND id=:id
`;

export const deleteCourseSched = `
	DELETE FROM courseSched 
	WHERE courseID = :courseID AND id = :id AND day=:day AND time=:time
`;

export const getCourseSched = `
	SELECT * FROM courseSched 
	WHERE courseID=:courseID
`;

export const dropCourseSched = `
	DROP TABLE courseSched
`;
