const dotenv = require("dotenv");
dotenv.config();

//the keys of the database are created and the environment variables are assigned
module.exports = {
    database: {
        host: process.env.DBHOST,
        user: process.env.DBUSER,
        password: process.env.DBPASS,
        database: process.env.DBNAME,
        port: process.env.DBPORT
    },
};