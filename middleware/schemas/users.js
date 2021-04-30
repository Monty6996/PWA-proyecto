const joi = require("joi");

const schemas = {
	create: joi.object().keys({
		username: joi.string().required(),
		password: joi.string().min(8).required().messages({
			"string.min": "Debe tener como minimo 8 caracteres.",
		}),
		email: joi
			.string()
			.email({ tlds: { allow: false } })
			.required(),
	}),
	modify: joi.object().keys({
		id: joi.number().integer().required(),
		username: joi.string().optional(),
		password: joi
			.string()
			.min(8)
			.optional()
			.messages({ "string.min": "Debe tener como minimo 8 caracteres." }),
		email: joi
			.string()
			.email({ tlds: { allow: false } })
			.optional(),
	}),
};

module.exports = schemas;
