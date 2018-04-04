export const getAwards = `
  SELECT * FROM
    viewAward
  WHERE employeeID = :employeeID
  ORDER BY endDate DESC
  LIMIT 10
`;

export const getResearch = `
  SELECT * FROM
    viewResearch
  WHERE employeeID = :employeeID
  ORDER BY
    endDate, startDate DESC
  LIMIT 10
`;

export const getAdminWork = `
  SELECT * FROM
    viewAdminWork
  WHERE employeeID = :employeeID
  LIMIT 10
`;

export const getExtensionAndCommunityService = `
  SELECT * FROM
    viewExtensionAndCommunityService
  WHERE employeeID = :employeeID
  ORDER BY date
  LIMIT 10
`;

export const getLimitedPracticeOfProf = `
  SELECT * FROM
    viewLimitedPracticeOfProf
  WHERE employeeID = :employeeID
  LIMIT 10
`;

export const getCreativeWork = `
  SELECT * FROM
    viewCreativeWork
  WHERE employeeID = :employeeID
  ORDER BY date DESC
  LIMIT 10
`;
