const express = require("express");
const router = express.Router();
const model = require("../model/users");
const sha1 = require("sha1");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const { v4: uuid } = require("uuid");
const { send } = require("../services/mail");
const { validateCreate } = require("./../middleware/users");

// JWT
const privateKey = fs.readFileSync("./keys/private.pem");
const singOptions = { algorithm: "RS256", expiresIn: "1h" };
const createToken = (payload) => jwt.sign(payload, privateKey, singOptions);

// Registrar un usuario.
const create = async (req, res) => {
	try {
		const { username, password, email } = req.body;

		// Consultar a la bd si hay un usuario con el email ingresado.
		const [verifyEmailExists] = await model
			.getSingle({ email: email })
			.then((response) => response)
			.catch((err) => res.status(500).json(err));

		// Verificar si el usuario ya esta registrado.
		if (verifyEmailExists) {
			res.status(403).send("email already exists!");
		} else {
			// Crear el usuario y mandarlo a la bd.
			const nuevo = {
				id: uuid(),
				username,
				password: sha1(password),
				email,
			};
			const token = createToken({ id: nuevo.id });
			const newUser = await model.create(nuevo);
			const mailInfo = {
				to: email,
				subject: "Gracias por registrarte.",
				html: `<a href = "${process.env.URL}/users/verify/${token}"> link de registro </a>`,
			};

			const mensaje = await send(mailInfo);
			res.status(201).json(mensaje);
		}
	} catch (err) {
		console.error(err);
		res.status(500);
	}
};

router.post("/", validateCreate, create);

module.exports = router;
