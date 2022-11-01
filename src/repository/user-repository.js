var sql_finder = require('../db/conf/sql-file-finder')
const pool = require('../db/conf/db-connection');

//the save function is created to use it when we save a user
async function save(new_user, new_company, new_address) {
    const script_new_company = sql_finder('insert-company.sql')
    const script_new_address = sql_finder('insert-address.sql')
    const script_new_user = sql_finder('insert-user.sql')

    await pool.query(script_new_company, [new_company]);
    await pool.query(script_new_address, [new_address]);
    await pool.query(script_new_user, [new_user]);
}


module.exports = {save}