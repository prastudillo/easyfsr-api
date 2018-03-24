import { formatQueryParams } from '../../utils';

export const addUser = `
  INSERT INTO user (
    employeeID, 
    password, 
    firstName, 
    middleName, 
    lastName, 
    officeNumber, 
    contractType, 
    emailAddress
  )
  VALUES (
    :employeeID, 
    :password, 
    :firstName, 
    :middleName, 
    :lastName, 
    :officeNumber, 
    :contractType, 
    :emailAddress
  )
`;

export const updateUser = user => `
  UPDATE user SET 
  ${formatQueryParams(user, 'update')}
  WHERE userID = :userID
`;

export const deleteUser = `
  UPDATE user SET
    isArchived = true
  WHERE userID = :userID
`;

export const getUser = `
  SELECT * from user
  WHERE userID = :userID AND isArchived = 0
`;

export const getUsers = (query, sortBy) => `
  SELECT * FROM user WHERE isArchived = 0 ${
    query.length ? `AND ${formatQueryParams(query, 'get')}` : ''
  } 
  ORDER BY [field] ${sortBy === 'DESC' ? 'DESC' : 'ASC'} LIMIT :limit
`;
