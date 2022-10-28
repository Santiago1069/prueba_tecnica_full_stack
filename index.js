var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 3525;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/', function(req, res){
	res.status(200).send({
		message: "Mensaje de prueba"
	});
});

app.listen(port, function(){
	console.log(`click on ==> http://localhost:${port}`);
});