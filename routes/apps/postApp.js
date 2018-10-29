'use strict';
const Joi = require('joi');

const schema = Joi.object().keys({
  name: Joi.string().required(),
  lang: Joi.string().required(),
  private: Joi.boolean().required(),
  desc: Joi.string(),
});
/**
 * Method to post a new entity to Wit.ai.
 * @param request The request library.
 * @param options The request options.
 * @param params The params, which are passed to the Wit.ai API.
 * @param callback Optional callback.
 * @returns {Promise<any>} The promise with the result.
 */
module.exports = (request, options, params, callback) => {
  return new Promise((resolve, reject) => {
    options.uri = 'https://api.wit.ai/apps';
    options.method = 'POST';
    options.body = params;
    const valResult = Joi.validate(params, schema);
    if (valResult.error === null) {
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
      return callback ? callback(valResult.error, null) :
        reject(valResult.error);
    }
  });
};
