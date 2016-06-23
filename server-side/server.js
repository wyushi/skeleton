import express from 'express';
import logger from 'morgan';
import methodOverride from 'method-override';
import bodyParser from 'body-parser';
import http from 'http';
import https from 'https';
import passport from 'passport';
import chalk from 'chalk';
import * as userApp from './user';
import * as config from './config.js';
import onError from './utils/error-handler.js';
import mongooseSetup from './services/mongodb.js';


const app = express();

app.use(logger('dev'));
app.use(methodOverride());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.passport  = passport;

// db connections
mongooseSetup();

// api routers
userApp.api(app);

// error handling
app.use(onError);

// http.createServer(app).listen(config.port);
// console.log(`HTTP server starts listening on port ${chalk.green(config.port)} ...`);
https.createServer(config.credentials, app).listen(config.port);
console.log(`HTTPS server starts listening on port ${chalk.green(config.port)} ...`);
