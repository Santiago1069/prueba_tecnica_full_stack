const dotenv = require("dotenv");
dotenv.config();

module.exports = {
    database: {
        host: process.env.DBHOST,
        user: process.env.DBUSER,
        password: process.env.DBPASS,
        database: process.env.DBNAME,
        port: process.env.DBPORT
    },
};