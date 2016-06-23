import elasticsearch from 'elasticsearch';
import * as config from '../config.js';

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

if (!config.elastic) {
  throw new Error('elastic config is missing');
}

export default new elasticsearch.Client(config.elastic);
