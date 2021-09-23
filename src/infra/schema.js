const Joi = require('joi');

const post_create_schema = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().email().required(),
});

const post_delete_schema = Joi.object().keys({
  username: Joi.string().required(),
});

module.exports = {
  POST_create: post_create_schema,
  POST_delete: post_delete_schema
};
