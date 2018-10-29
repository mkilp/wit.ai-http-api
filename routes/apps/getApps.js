'use strict';
/**
 * This callback type is called `requestCallback` and is displayed as a global symbol.
 *
 * @callback requestCallback
 * @param {Object} err - the error object.
 * @param {Array} data - A list of entities.
 */

/**
 *
 * @param request
 * @param options
 * @param {requestCallback} [callback] - an optional callback.
 * @returns {Promise<any>} A promise that will resolve to the result.
 */
module.exports = (request, options, callback) => {
  return new Promise((resolve, reject) => {
    options.uri = 'https://api.wit.ai/apps?limit=500';
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
  });
};
