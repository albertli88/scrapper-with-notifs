console.log('Server-side code running');

const express = require('express');
const app = express();
var bodyParser = require('body-parser')

app.use(express.static('public'));
app.use(bodyParser.json())

// start the express web server listening on 8080
app.listen(8080, () => {
  console.log('listening on 8080');
});

// serve the homepage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/intro_page.html');
});

app.post('/clicked', (req, res) => {
	console.log(req.body);
});