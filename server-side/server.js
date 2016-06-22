import express from 'express';
import logger from 'morgan';
import methodOverride from 'method-override';
import bodyParser from 'body-parser';
import http from 'http';
import https from 'https';
import mongoose from 'mongoose';
import passport from 'passport';
import chalk from 'chalk';
import * as userApp from './user';
import { host, port, credentials, mongo } from './config.js';
import onError from './utils/error-handler.js';

const app = express();

app.use(logger('dev'));
app.use(methodOverride());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.passport = passport;

// db connections
mongoose.connection.on('error', console.error);
mongoose.connect(`mongodb://${mongo.host}:${mongo.port}/${mongo.name}`);

// api routers
userApp.attachTo(app);

// error handling
app.use(onError);

// http.createServer(app).listen(3000);
// console.log(`HTTP server starts listening on port ${chalk.green(port)} ...`);
https.createServer(credentials, app).listen(port);
console.log(`HTTPS server starts listening on port ${chalk.green(port)} ...`);
