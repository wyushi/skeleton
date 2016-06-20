import express from 'express';
import logger from 'morgan';
import methodOverride from 'method-override';
import bodyParser from 'body-parser';
import http from 'http';
import https from 'https';
import mongoose from 'mongoose';
import chalk from 'chalk';
import * as userApp from './user';
import { host, port, credentials, mongo } from './config.js';


const app = express();

app.use(logger('combined'));
app.use(methodOverride());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// db connections
mongoose.connection.on('error', console.error);
mongoose.connect(`mongodb://${mongo.host}:${mongo.port}/${mongo.name}`);

// api routers
userApp.router.attachTo(app);

// error handling
app.use((err, req, res, next) => {
  console.log(chalk.red('Error: ') + err.message);
  res.status(500).send(err);
});

// http.createServer(app).listen(3000);
// console.log(`HTTP server starts listening on port ${chalk.green(port)} ...`);
https.createServer(credentials, app).listen(port);
console.log(`HTTPS server starts listening on port ${chalk.green(port)} ...`);
