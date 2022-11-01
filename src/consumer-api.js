const { v4: uuidv4 } = require('uuid');
var md5 = require('md5');

const fetch = require('node-fetch');
const dotenv = require("dotenv");
const user_repository = require('./repository/user-repository') 

dotenv.config();

module.exports = async function() {
    
    var url = process.env.TYPI_CODE_URL
    console.log('request typi code users api...')
    console.log(`requesting url: ${url}`)
    
    fetch(url)
        .then(res => res.json())
        .then(json => {
            console.log(`loading users...`)
            json.forEach(user => {
                save_user(user);
            })
            console.log(`users loaded!!`)
        })

}

function save_user(user) {
    const { name, username, email, phone, website } = user;
    const { street, suite, city, zipcode } = user.address;
    const { lat, lng } = user.address.geo;
    const { catchPhrase, bs } = user.company;
    const name_company = user.company.name;

    const new_address = { id_address: uuidv4(), street, suite, city, zipcode, lat, lng };
    const new_company = { id_company: uuidv4(), company_name: name_company, catch_phrase: catchPhrase, bs };
    const new_user = {
        id_user: uuidv4(), name, username, email, phone, website,
        id_company: new_company.id_company, id_address: new_address.id_address,
        gravatar: md5(email)
    };

    user_repository.save(new_user, new_company, new_address);
}
