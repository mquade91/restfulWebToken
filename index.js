const express = require('express');
bodyParser = require('body-parser');
morgan = require('morgan');
jwt = require('jsonwebtoken');
config = require('./configurations/config');
app = express();

//set secret
app.set('Secret', config.secret);

//use morgan to log requests to the console 
app.use(morgan('dev'));

//parse applications/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//parse application/json
app.use(bodyParser.json());

let PORT = process.env.PORT || 8080;

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
  
});

app.get('/', function(req, res) {
    res.send('Hello world');
});

//username and password to check credentials
app.post('/authenticate', (req,res) => {

	if(req.body.username === 'mattWebDev') {

		if (req.body.password === 1) {
			//if credentials are valid
			const payload = {
				check: true
			};

			let token = jwt.sign(payload, app.get('Secret'), {
				expiresIn: 1440 // expires in 24 hours
			});

			res.json ({
				message: 'authentication done' ,
				token: token
			});

			} else {
			//res.json ({ message: "Invalid password"})
			console.log(req.body.password)
			} 
		
		} else {
			res.json ({ message: 'Username not valid'})
		}
})



