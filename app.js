const express = require('express');
const querystring = require('querystring');

const bodyParser = require('body-parser');
const app = express();
const http = require('http');
var str = '';
var callback ;


app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (request, response) =>  response.sendFile(`${__dirname}/index.html`));
app.get('/login', (request, response) =>  response.sendFile(`${__dirname}/index.html`));
app.get('/register', (request, response) =>  response.sendFile(`${__dirname}/index.html`));

app.post('/login', (req, response) => {
  const username = req.body.name;
  const password = req.body.pass;
  console.log(username,"",password);   
  var bodyString = JSON.stringify({
   	Name: username,
    Password: password
});

  var option1 = {
    host: "localhost",
    port: 8080,
    path: "/login",
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        'Content-Length': Buffer.byteLength(bodyString)
    }
  };
  console.log(option1);
  var post_req=http.request(option1, function(re) {
	str = '';
	re.on('data', function(chunk) {
	str += chunk;
	});
	re.on('end', function() {
	console.log(str);
	if(str.toString().trim() == "\"REGISTERED\""){
		response.send(str)
	}
	else{
		response.sendFile(`${__dirname}/index.html`);
	}
	});
	}).write(bodyString);
  
});

app.post('/register', (req, response) => {
  const username = req.body.name;
  const password = req.body.pass
  console.log(username,"",password);
  response.send("REGISTERED")
   
  var bodyString = JSON.stringify({
    Name: username,
    Password: password
});

  var option2 = {
    host: "localhost",
    port: 8080,
    path: "/users",
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        'Content-Length': Buffer.byteLength(bodyString)

    }
  };
  console.log(option2);
  var post_req=http.request(option2, callback).write(bodyString);
  
});

app.listen(8081, () => console.info('Application running on port 8081'));