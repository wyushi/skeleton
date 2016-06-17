import express from 'express';
import logger from 'morgan';
import methodOverride from 'method-override';
import bodyParser from 'body-parser';
import fs from 'fs';
import http from 'http';
import https from 'https';
import mongoose from 'mongoose';
import * as userApp from './User';
import { handleError as validateErrorHandler } from './utils/validate.js';


const credentials = {
        key: fs.readFileSync(__dirname + '/ssl/key.pem', 'utf8'),
        cert: fs.readFileSync(__dirname + '/ssl/cert.pem', 'utf8'),
        passphrase: '0000'
      },
      mongo = {
        host: 'mongo',
        port: 27017,
        name: 'dev'
      },
      app = express();

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
app.use(validateErrorHandler);

// http.createServer(app).listen(3000);
https.createServer(credentials, app).listen(3000);
console.log('Server starts listening on port 3000 ...');
