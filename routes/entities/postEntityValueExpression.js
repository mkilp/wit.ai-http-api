'use strict';

const Joi = require('joi');

const schema = Joi.object().keys({
  expression: Joi.string().required(),
});

module.exports = (request, options, eId, vId, params, callback) => {
  return new Promise((resolve, reject) => {
    if (typeof eId === 'string' && eId && vId) {
      const result = Joi.validate(params, schema);
      if (result.error === null) {
        options.uri = `https://api.wit.ai/entities/${eId}/values/${vId}/expressions`;
        options.method = 'POST';
        options.body = params;
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
        return callback ? callback(result.error, null) : reject(result.error);
      }
    } else {
      return callback ? callback({
        error: 'id needs to be set and a string!',
      }, null) : reject({
        error: 'id needs to be set and a string!',
      });
    }
  });
};
