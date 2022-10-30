var express = require('express');
var router = express.Router();
var sqlFinder = require('../../db/conf/sql-file-finder')
const { v4: uuidv4 } = require('uuid');
const pool = require('../../db/conf/db-connection');

const url = '/users'

// TODO: create services
router.get(url, async function (req, res) {

    const script_consult_user = sqlFinder('get-users.sql')
    const users = await pool.query(script_consult_user) 

    res.send(users);

});

router.post(url, async function (req, res) {

    const {name, username, email, phone, website  } = req.body
    const {street, suite, city, zipcode} = req.body.address
    const {lat, lng} = req.body.address.geo
    const {catchPhrase, bs} = req.body.company
    const name_company = req.body.company.name

    const new_address = {id_address: uuidv4(), street, suite, city, zipcode, lat, lng}
    const new_company = {id_company: uuidv4(), company_name: name_company, catch_phrase: catchPhrase, bs}

    const new_user = {id_user: uuidv4(), name, username, email, phone, website, 
        id_company : new_company.id_company, id_address : new_address.id_address
    }

    const script_new_company = sqlFinder('insert-company.sql')
    const script_new_address = sqlFinder('insert-address.sql')
    const script_new_user = sqlFinder('insert-user.sql')

    await pool.query(script_new_company, [new_company]);
    await pool.query(script_new_address, [new_address]);
    await pool.query(script_new_user, [new_user]);
    
    res.send({user: new_user, address: new_address, company: new_company});
});

router.put(`${url}/:id`, async function (req, res) {

    const { id } = req.params;
    const {name, username, email, phone, website  } = req.body
    const {street, suite, city, zipcode} = req.body.address
    const {lat, lng} = req.body.address.geo
    const {catchPhrase, bs} = req.body.company
    const name_company = req.body.company.name

    const update_address = { street, suite, city, zipcode, lat, lng}
    const update_company = {company_name: name_company, catch_phrase: catchPhrase, bs}

    const update_user = {name, username, email, phone, website}


    const script_update_address = sqlFinder('update-address.sql');
    const script_update_company = sqlFinder('update-company.sql');
    const script_update_user = sqlFinder('update-user.sql');


    await pool.query(script_update_address, [update_address, id]);
    await pool.query(script_update_company, [update_company, id]);
    await pool.query(script_update_user, [update_user, id]);


    res.send({user: update_user, address: update_address, company: update_company});


});

router.delete(`${url}/:id`, async function (req, res) {

    const { id } = req.params;
    const script_delete_user = sqlFinder('delete-user.sql')
    await pool.query(script_delete_user, [id]);
});

module.exports = router;
