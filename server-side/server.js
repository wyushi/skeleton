import express from 'express';
import logger from 'morgan';
import methodOverride from 'method-override';
import bodyParser from 'body-parser';


var app = express();
app.use(logger('combined'));
app.use(methodOverride());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('hello world!');
});

app.listen(3000);
console.log('Server starts listening on port 3000 ...');
