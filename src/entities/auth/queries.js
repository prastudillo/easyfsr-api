export const getUser = `
  SELECT * FROM user
  WHERE emailAddress = :emailAddress AND isArchived = 0
`;
