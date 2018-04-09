import fs from 'fs-extra';
import mv from 'mv';
import shortID from 'shortid';

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
  query.offset = (parseInt(query.page) - 1) * limit || 0;

  appendList.forEach(key => {
    if (query.hasOwnProperty(key)) {
      query[key] = `%${query[key]}%`;
    }
  });

  return query;
};

export const upload = (file, dest) => {
  return new Promise((resolve, reject) => {
    let [, filename, extension] = file.name.match(/(.+)\.([\w\d]+)$/);
    filename = filename.substring(0, 20);
    filename = `${filename}-${shortID.generate()}.${extension}`;
    const fileDest = `public/uploads/${dest}/${filename}`;

    file.mv(fileDest, err => {
      if (err) return reject(500);
      return resolve(fileDest);
    });
  });
};

export const unlink = path => {
  return new Promise((resolve, reject) => {
    fs.remove(path, err => {
      if (err) return reject(500);
      return resolve();
    });
  });
};
