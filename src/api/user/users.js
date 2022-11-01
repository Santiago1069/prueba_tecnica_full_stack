var express = require('express');
var router = express.Router();
var sql_finder = require('../../db/conf/sql-file-finder')
const { v4: uuidv4 } = require('uuid');
const pool = require('../../db/conf/db-connection');
const mapper_user = require('./mapper-user')
const md5 = require('md5');
const user_repository = require('../../repository/user-repository') 

const url = '/users'

//the GET request is created so that it consults all the users of the database
router.get(url, async function (req, res) {
    
    const script_get_user = sql_finder('select-all-users.sql')
    const list_users = await pool.query(script_get_user) 

    res.send(
        list_users.map(function(user) {
            return mapper_user.fromDB(user) 
        })
    );
});

//the GET request is created to query a user by id in the database
router.get(`${url}/:id`, async function (req, res) {

    const {id} = req.params
    const script_consult_users = sql_finder('select-user-by-id.sql')
    const user = await pool.query(script_consult_users, [id])
    if(user[0] != null ){
        res.send( mapper_user.fromDB(user[0]));
    } else{
        res.sendStatus(404)
    }

});

//The POST request is created to save the user information in the database
router.post(url, async function (req, res) {
    const {name, username, email, phone, website  } = req.body
    const {street, suite, city, zipcode} = req.body.address
    const {lat, lng} = req.body.address.geo
    const {catchPhrase, bs} = req.body.company
    const name_company = req.body.company.name

    const new_address = {id_address: uuidv4(), street, suite, city, zipcode, lat, lng}
    const new_company = {id_company: uuidv4(), company_name: name_company, catch_phrase: catchPhrase, bs}
    const new_user = {id_user: uuidv4(), name, username, email, phone, website, 
        id_company : new_company.id_company, id_address : new_address.id_address,
        gravatar: md5(email)
    }
    
    user_repository.save(new_user, new_company, new_address)

    res.send(
        mapper_user.fromData(new_user, new_company, new_address)
    );
});

//PUT request is created to update a user by id
router.put(`${url}/:id`, async function (req, res) {

    const { id } = req.params;
    const {name, username, email, phone, website  } = req.body
    const {street, suite, city, zipcode} = req.body.address
    const {lat, lng} = req.body.address.geo
    const {catchPhrase, bs} = req.body.company
    const name_company = req.body.company.name

    const update_address = { street, suite, city, zipcode, lat, lng}
    const update_company = {company_name: name_company, catch_phrase: catchPhrase, bs}
    const update_user = {name, username, email, phone, website, gravatar: md5(email)}


    const script_update_address = sql_finder('update-address.sql');
    const script_update_company = sql_finder('update-company.sql');
    const script_update_user = sql_finder('update-user.sql');


    await pool.query(script_update_address, [update_address, id]);
    await pool.query(script_update_company, [update_company, id]);
    await pool.query(script_update_user, [update_user, id]);


    res.send(
        mapper_user.fromData(update_user, update_company, update_address)
    );


});

//the DELETE request is created to delete a user by id
router.delete(`${url}/:id`, async function (req, res) {

    const { id } = req.params;
    const script_delete_user = sql_finder('delete-user.sql')
    await pool.query(script_delete_user, [id]);

    res.send({})
});

module.exports = router;
