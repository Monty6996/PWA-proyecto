const schemas = require('./schemas/users');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const publicKey = fs.readFileSync('./keys/public.pem');

const validateCreate = (req, res, next) => {
	const { error, value } = schemas.create.validate(req.body);
	console.error(error);
	error ? res.status(422).json({ message: error.details[0].message }) : next();
};

const validateModify = (req, res, next) => {
	const obj = req.body;
	obj.id = req.params.id;

	const { error, value } = schemas.modify.validate(obj);
	console.log(error);
	error ? res.status(422).json({ message: error.details[0].message }) : next();
};

// MIDDLEWARE
const validateEmail = (req, res, next) => {
	try {
		console.log(req.params.token);
		const { id } = jwt.verify(req.params.token, publicKey);
		console.log('traducido:', id);
		req.token = id;
		next();
	} catch (error) {
		console.error(error);
		res.sendStatus(504);
	}
};

module.exports = { validateCreate, validateModify, validateEmail };
