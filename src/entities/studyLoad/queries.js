import { formatQueryParams } from '../../utils';

export const addStudyLoad = `
	INSERT INTO studyLoad ( degree, university, totalSLcredits, id )
	VALUES ( :degree, :university, :totalSLcredits, :id )`;

export const updateStudyLoad = studyLoad => `
	UPDATE studyLoad 
  ${formatQueryParams(studyLoad, 'update')}
	WHERE id=:id
`;

// Supports single or multiple rows delete of studyLoad
/*
export const deleteStudyLoads = query = `
	DELETE FROM studyLoad 
	${query.length ? `WHERE ${formatQueryParams(query)}` : ''}
`;
*/

export const deleteStudyLoad = `
	DELETE FROM studyLoad 
	where id = :id
`;

export const getStudyLoad = `
	SELECT * FROM studyLoad 
  WHERE id = :id
`;
