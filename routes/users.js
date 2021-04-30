var express = require("express");
var router = express.Router();
const model = require("../model/users");
const { validateEmail } = require("../middleware/users");

/* GET users listing. */
router.get("/verify/:token", validateEmail, (req, res) => {
	try {
		model
			.modify(req.token, { habilitado: true })
			.then((response) => res.json(response))
			.catch((err) => res.status(500).json(err));
	} catch (error) {
		console.error(error);
	}
});

module.exports = router;
