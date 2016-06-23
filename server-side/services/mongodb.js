import chalk from 'chalk';
import mongoose from 'mongoose';
import * as config from '../config.js';

if (!config.mongo) {
  throw new Error('mongodb config is missing');
}


function setup() {

  mongoose.connection.on('connected', () => {
    console.log(chalk.red('Mongo: ') + chalk.green('ready'));
  });

  mongoose.connection.on('error', (err) => {
    console.error(chalk.red('Mongo: ') + err.stack);
  });

  mongoose.connect(`mongodb://${config.mongo.host}:${config.mongo.port}/${config.mongo.name}`);
}

export default setup;
