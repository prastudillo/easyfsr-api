import * as Utils from '../../utils';

export const addCourse =
  'INSERT INTO course ( hoursPerWeek, school, credit, courseNumber ) VALUES ( :hoursPerWeek, :school, :credit, :courseNumber )';

export const updateCourse = course =>
  `UPDATE course SET   ${Utils.formatQueryParams(
    course,
  )} WHERE courseNumber= :courseNumber`;

export const deleteCourse =
  'delete from course where courseNumber = :courseNumber';

export const getCourse = `
  SELECT * from course
  WHERE courseNumber = :courseNumber
`;

export const selectCourse =
  'SELECT *FROM course WHERE fsrID=:fsrID courseNumber=:courseNumber school=:school credit=:credit ORDER BY id ASC LIMIT 10';

export const dropCourse = 'DROP TABLE course';

// export const addCourseSched = 'INSERT INTO courseSched ( courseNumber, day, time ) VALUES ( :courseNumber, :day, :time );';

// export const updateCourseSched = 'UPDATE courseSched SET day= :day, time=:time  WHERE courseNumber=:courseNumber';

// export const deleteCourseSched = 'delete from courseSched where courseNumber = :courseNumber';

// export const selectCourseSched = 'SELECT *FROM courseSched WHERE courseNumber=:courseNumber, day=:day, time=:time ORDER BY courseNumber ASC LIMIT 10';

// export const dropCourseSched = 'DROP TABLE courseSched';