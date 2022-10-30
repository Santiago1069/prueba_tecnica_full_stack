const fs = require('fs')

module.exports = function(sqlName) {
    return fs.readFileSync(`${__dirname}/../../db/sql/${sqlName}`).toString()
}   