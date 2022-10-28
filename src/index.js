const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');


const app = express();
const port = process.env.PORT || 3525;


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.get('/', function(req, res){

	fetch("http://jsonplaceholder.typicode.com/users")
		.then((response) => {
			return response.json()
		}).then((resp) => {
			res.send({message: resp});
		})
});


app.listen(port, function(){
	console.log(`click on ==> http://localhost:${port}`);
});