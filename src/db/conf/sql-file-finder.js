const fs = require('fs')

//a function is created that receives as a parameter the name of an sql file that obtains the text of that file
module.exports = function(sqlName) {
    return fs.readFileSync(`${__dirname}/../../db/sql/${sqlName}`).toString()
}   