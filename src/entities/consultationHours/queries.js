import { formatQueryParams } from '../../utils';

export const addConsultationHour = `
  INSERT INTO consultationHours (
    chID,
    id, 
    place
  )
  VALUES (
    DEFAULT,
    :id,
    :place
  )
`;

export const updateConsultationHour = `
  UPDATE consultationHours SET 
    place = :place
  WHERE id = :id AND chID = :chID
`;

export const getConsultationHours = (query, sortBy) => `
  SELECT * FROM consultationHours NATURAL JOIN chTimeSlot ${
    query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
  }
  ORDER BY [field] ${sortBy === 'DESC' ? 'DESC' : 'ASC'} 
  LIMIT :limit
`;

export const deleteConsultationHours = `
  DELETE FROM consultationHours
  WHERE id = :id
`;

export const addTimeslot = `
    INSERT INTO chTimeslot (
      chTimeslotID,
    		chID,
        id,
        day,
        time
    )
    VALUES (
		DEFAULT,
        :chID,
        :id,
        :day,
        :time
    )
`;

export const updateTimeslot = timeslot => `
    UPDATE chTimeSlot SET 
      ${formatQueryParams(timeslot, 'update')}
    WHERE chID = :chID AND id = :id
`;

export const deleteTimeslot = `
    DELETE FROM chTimeslot
    WHERE id = :id AND chID = :chID AND day = :day AND time = :time 
`;
