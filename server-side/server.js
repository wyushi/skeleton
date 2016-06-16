import express from 'express';
import logger from 'morgan';
import methodOverride from 'method-override';
import bodyParser from 'body-parser';
import fs from 'fs';
import http from 'http';
import https from 'https';


const credentials = {
        key: fs.readFileSync(__dirname + '/ssl/key.pem', 'utf8'),
        cert: fs.readFileSync(__dirname + '/ssl/cert.pem', 'utf8'),
        passphrase: '0000'
      },
      app = express();

app.use(logger('combined'));
app.use(methodOverride());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('hello world!');
});


// http.createServer(app).listen(3000);
https.createServer(credentials, app).listen(3000);
console.log('Server starts listening on port 3000 ...');
