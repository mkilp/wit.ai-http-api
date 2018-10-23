'use strict';
/**
 * This callback type is called `requestCallback` and is displayed as a global symbol.
 *
 * @callback requestCallback
 * @param {Object} err - the error object.
 * @param {Array} data - A list of entities.
 */

const request = require('request-promise-native');
let options;

function WitHttpApi(witAccessToken) {
  this.options = {
    headers: {
      'User-Agent': 'Request-Promise',
      'Authorization': 'Bearer ' + witAccessToken,
    },
    json: true, // Automatically parses the JSON string in the response
  };
  options = this.options;
}

WitHttpApi.prototype.entities = {
  /**
   * Method to get all entities as an array.
   * @param {requestCallback} [callback] An optional callback.
   * @returns {Promise<any>|Promise} A promise that will resolve to the result.
   */
  getEntities: (callback) => {
    return require('./routes/entities/getEntities')(
      request, options, callback
    );
  },
  /**
   * Method to post a new entity to Wit.ai.
   * @param params The params, which are passed to the Wit.ai API.
   * @param callback Optional callback.
   * @returns {Promise} The result of the call as a Promise.
   */
  postEntities: (params, callback) => {
    return require('./routes/entities/postEntities')(
      request, options, params, callback
    );
  },
};

module.exports = WitHttpApi;
