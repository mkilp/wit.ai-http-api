'use strict';

module.exports = (request, options, eId, vId, exId, callback) => {
  return new Promise((resolve, reject) => {
    if (typeof eId === 'string' && eId && vId && exId) {
      let encoded = encodeURIComponent(exId);
      options.uri = `https://api.wit.ai/entities/${eId}/values/${vId}/expressions/${encoded}`;
      options.method = 'DELETE';
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
