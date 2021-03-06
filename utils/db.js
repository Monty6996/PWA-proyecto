const knex = require("knex")({
	client: "mysql",
	connection: {
		host: 'localhost' || process.env.BD_HOST,
		user: "root" || process.env.BD_USER,
		password: process.env.BD_PASSWORD,
		database: "trabj" || process.env.BD_DB,
		pool: { min: 1, max: 10 },
	},
});

module.exports = knex;
