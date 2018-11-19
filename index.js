'use strict';
/**
 * @typedef WitError
 * @property {String} error The error message.
 * @property {String} code A unique error code.
 */
/**
 * This callback type is called `requestCallback` and is displayed as a global symbol.
 *
 * @callback requestCallback
 * @param {Object} err - the error object.
 * @param {Array} data - A list of entities.
 */

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

const request = require('request-promise-native');
let options;

/**
 * The class that holds the wit http api.
 * @param {String} witAccessToken The access token for the API.
 * @class
 */
function WitHttpApi(witAccessToken) {
  /**
   * Setting the options for the request library.
   * @type {{headers: {'User-Agent': string, Authorization: string}, json: boolean}}
   */
  this.options = {
    headers: {
      'User-Agent': 'Request-Promise',
      'Authorization': 'Bearer ' + witAccessToken,
    },
    json: true, // Automatically parses the JSON string in the response
  };
  options = this.options;
}

/**
 * @memberOf WitHttpApi
 * @type {{getEntities: (function(requestCallback=): (Promise<any>|Promise)), postEntities: (function(Object, requestCallback=): (Promise<any>|Promise)), getEntityById: (function(String, requestCallback=): Promise), putEntityById: (function(String, Object, requestCallback=): Promise), postEntityValues: (function(String, Object, requestCallback=): Promise), deleteEntityValue: (function(String, String, requestCallback=): Promise), postEntityValueExpression: (function(String, String, Object, requestCallback=): Promise), deleteEntityValueExpression: (function(String, String, String, requestCallback=): Promise)}}
 */
WitHttpApi.prototype.entities = {
  /**
   * Method to get all entities as an array.
   * @memberOf WitHttpApi
   * @param {requestCallback} [callback] An optional callback.
   * @returns {Promise<any | WitError>|Promise} A promise that will resolve to the result.
   */
  getEntities: (callback) => {
    return require('./routes/entities/getEntities')(
      request, options, callback,
    );
  },
  /**
   * Method to post a new entity to Wit.ai.
   * @memberOf WitHttpApi
   * @param {Object} params The params, which are passed to the Wit.ai API.
   * @param {requestCallback} [callback] Optional callback.
   * @returns {Promise<any | WitError>} The result of the call as a Promise.
   */
  postEntities: (params, callback) => {
    return require('./routes/entities/postEntities')(
      request, options, params, callback,
    );
  },
  /**
   * Method to fetch an entity by its id.
   * @memberOf WitHttpApi
   * @param {String} id The id of the entity to fetch.
   * @param {requestCallback} [callback] Optinal callback.
   * @returns {Promise<any | WitError>} The result of the call as a Promise.
   */
  getEntityById: (id, callback) => {
    return require('./routes/entities/getEntityById')(
      request, options, id, callback,
    );
  },
  /**
   * Method to update an entity via its' id.
   * @memberOf WitHttpApi
   * @param {String} id The id of the entity.
   * @param {Object} params A object with the needed arguments for the update.
   * @param {requestCallback} [callback] Optional callback
   * @returns {Promise<any | WitError>} The result of the call as a Promise.
   */
  putEntityById: (id, params, callback) => {
    return require('./routes/entities/putEntityById')(
      request, options, id, params, callback,
    );
  },
  /**
   * Method to add a value to an entity.
   * @memberOf WitHttpApi
   * @param {String} id The id of the entity.
   * @param {Object} params The wit.ai parameters.
   * @param {requestCallback} [callback] Optional callback.
   * @returns {Promise<any | WitError>} The result of the call as a promise.
   */
  postEntityValues: (id, params, callback) => {
    return require('./routes/entities/postEntityValue')(
      request, options, id, params, callback,
    );
  },
  /**
   * Method to add a value to an entity.
   * @memberOf WitHttpApi
   * @param {String} eId The id of the entity.
   * @param {String} vId The id of the value.
   * @param {requestCallback} [callback] Optional callback.
   * @returns {Promise<any | WitError>} The result of the call as a promise.
   */
  deleteEntityValue: (eId, vId, callback) => {
    return require('./routes/entities/deleteEntityValue')(
      request, options, eId, vId, callback,
    );
  },
  /**
   * Method to add a value to an entity.
   * @memberOf WitHttpApi
   * @param {String} eId The id of the entity.
   * @param {String} vId The id of the entity.
   * @param {Object} params The wit.ai api parameters.
   * @param {requestCallback} [callback] Optional callback.
   * @returns {Promise<any | WitError>} The result of the call as a promise.
   */
  postEntityValueExpression: (eId, vId, params, callback) => {
    return require('./routes/entities/postEntityValueExpression')(
      request, options, eId, vId, params, callback,
    );
  },
  /**
   * Method to add a value to an entity.
   * @memberOf WitHttpApi
   * @param {String} eId The id of the entity.
   * @param {String} vId The id of the value.
   * @param {String} exId The id of the expression.
   * @param {requestCallback} [callback] Optional callback.
   * @returns {Promise<any | WitError>} The result of the call as a promise.
   */
  deleteEntityValueExpression: (eId, vId, exId, callback) => {
    return require('./routes/entities/deleteEntityValueExpression')(
      request, options, eId, vId, exId, callback,
    );
  },
  /**
   * Method to delete a given Entity by its id.
   * @memberOf WitHttpApi
   * @param {String} id The id of the entity.
   * @param {requestCallback} [callback] Optional callback.
   * @returns {Promise<any | WitError>} The result of the call as a promise.
   */
  deleteEntityById: (id, callback) => {
    return require('./routes/entities/deleteEntityById')(
      request, options, id, callback,
    );
  },
};

WitHttpApi.prototype.apps = {
  getApps: (callback) => {
    return require('./routes/apps/getApps')(
      request, options, callback,
    );
  },
  getAppById: (id, callback) => {
    return require('./routes/apps/getAppById')(
      request, options, id, callback,
    );
  },
  postApp: (params, callback) => {
    return require('./routes/apps/postApp')(
      request, options, params, callback,
    );
  },
  putAppById: (id, params, callback) => {
    return require('./routes/apps/putAppById')(
      request, options, id, params, callback,
    );
  },
  deleteAppById: (id, params, callback) => {
    return require('./routes/apps/deleteAppById')(
      request, options, id, callback,
    );
  },
};

WitHttpApi.prototype.samples = {
  postSamples: (params, callback) => {
    return require('./routes/samples/postSamples')(
      request, options, params, callback,
    );
  },
};

module.exports = WitHttpApi;
