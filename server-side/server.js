import express from 'express';

var app = express();

app.get('/', (req, res) => {
  res.send('hello world!');
});

app.listen(3000);
console.log('server starts listen on port 3000 ...');
