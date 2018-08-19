console.log('Server-side code running');

const express = require('express');
const app = express();
var bodyParser = require('body-parser')

const { exec } = require('child_process');

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
	//console.log(req.body.item_name)

	exec('scrapy crawl ssense -a start_url="https://www.ssense.com/en-us/men/designers/apc"', (err, stdout, stderr) => {
  		if (err) {
    // node couldn't execute the command
    		console.log(err);
    		return;
  		}

  		console.log("no fail");

  // the *entire* stdout and stderr (buffered)
  		console.log(`stdout: ${stdout}`);
  		console.log(`stderr: ${stderr}`);
	});
});