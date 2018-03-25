export const formatQueryParams = (query, method) =>
  query.reduce((field, key, i) => {
    method === 'get'
      ? (field += `${key} LIKE :${key}${i === query.length - 1 ? '' : ' AND '}`)
      : (field += `${key} = :${key}${i === query.length - 1 ? '' : ', '}`);
    return field;
  }, '');

export const filtered = (payload = {}, attributes) =>
  Object.keys(payload).filter(key => attributes.includes(key));

export const escapeSearch = (query, appendList, limit = 12) => {
  query.limit = parseInt(limit);

  appendList.forEach(key => {
    if (query.hasOwnProperty(key)) {
      query[key] = `%${query[key]}%`;
    }
  });

  return query;
};
