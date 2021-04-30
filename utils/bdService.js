const bd = require("./db");

const create = (tableName, obj) => bd(tableName).insert(obj);
const modify = (tableName, id, obj) => bd(tableName).where({ id }).update(obj);

module.exports = { create, modify };
