'use strict';

const Joi = require('joi');

const schema = Joi.object().keys({
  value: Joi.string().required(),
  expressions: Joi.array().items(Joi.string()),
  metadata: Joi.string(),
});

module.exports = (request, options, id, params, callback) => {
  return new Promise((resolve, reject) => {
    if (typeof id === 'string' && id) {
      const result = Joi.validate(params, schema);
      if (result.error === null) {
        options.uri = `https://api.wit.ai/entities/${id}/values`;
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
