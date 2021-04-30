const bd = require("../utils/db");
const bdService = require("../utils/bdService");

const getAll = () => bd("usuario").select("username", "password");

const getSingle = ({id = false, email = false}) =>
	bd("usuario").where("id", id).orWhere("email", email).select("username", "password", "email");

const create = async (obj) => {
	try {
		const id = await bdService.create("usuario", obj);
		return id;
	} catch (e) {
		console.error(e);
	}
};

const modify = (id, obj) => bd("usuario").where({ id }).update(obj);

module.exports = { getAll, getSingle, create, modify };
