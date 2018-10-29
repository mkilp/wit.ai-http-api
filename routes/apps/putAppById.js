'use strict';

const Joi = require('joi');

const schema = Joi.object().keys({
  name: Joi.string(),
  lang: Joi.string(),
  private: Joi.string(),
  timezone: Joi.string(),
  desc: Joi.string(),
});

module.exports = (request, options, id, params, callback) => {
  return new Promise((resolve, reject) => {
    if (typeof id === 'string' && id) {
      const result = Joi.validate(params, schema);
      if (result.error === null) {
        options.uri = `https://api.wit.ai/apps/${id}`;
        options.method = 'PUT';
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
