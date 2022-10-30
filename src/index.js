const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const consumerApi = require('./consumer-api')
const usersApi = require('./api/user/users')
const dotenv = require("dotenv");

dotenv.config();
const port = process.env.SERVER_PORT || 3525;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


// load apis
app.use('/api', usersApi)

app.listen(port, function(){
	console.log(`click on ==> http://localhost:${port}`);
	consumerApi()
});
