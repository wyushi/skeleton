import chalk from 'chalk';
import elasticsearch from 'elasticsearch';
import * as config from '../config.js';

if (!config.elastic) {
  throw new Error('elastic config is missing');
}

const client = new elasticsearch.Client(config.elastic);

client.ping({ hello: "elasticsearch!" }, (error) => {
  if (error) {
    console.error(chalk.red('Elastic: ') + err.stack);
  } else {
    console.log(chalk.red('Elastic: ') + chalk.green('ready'));
  }
});

var firstLoad = true;

if (firstLoad) {
  firstLoad = false;
} else {
  console.error(`
    ------------------------------------------------------


          elastic-search.js loaded multiple times!!!


    ------------------------------------------------------
    `);
}

export default client;
