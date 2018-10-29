'use strict';

module.exports = (request, options, id, callback) => {
  return new Promise((resolve, reject) => {
    if (typeof id === 'string' && id) {
      options.uri = `https://api.wit.ai/entities/${id}`;
      options.method = 'GET';
      request(options)
        .then((data) => {
          if (data && data.error) {
            return callback ? callback(data, null) : reject(data);
          } else {
            return callback ? callback(null, data) : resolve(data);
          }
        })
        .catch((error) => {
          return callback ? callback(error, null) : reject(error);
        });
    } else {
      return callback ? callback({
        error: 'id needs to be set and a string!',
      }, null) : reject({
        error: 'id needs to be set and a string!',
      });
    }
  });
};
