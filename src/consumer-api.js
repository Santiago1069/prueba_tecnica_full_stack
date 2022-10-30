const fetch = require('node-fetch');
const dotenv = require("dotenv");
dotenv.config();

module.exports = function() {
    
    var url = process.env.TYPI_CODE_URL
    console.log('request typi code users api...')
    console.log(`requesting url: ${url}`)
    
    fetch(process.env.TYPI_CODE_URL)
        .then((response) => {
            return response.json()
        }).then((resp) => {
            // TODO: Mapper data insert to data base
            console.log(`data loaded from ${url}`)
        })
}