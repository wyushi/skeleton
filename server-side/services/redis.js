import chalk from 'chalk';
import redis from 'redis';
import * as config from '../config.js';

if (!config.redis) {
  throw new Error('redis config is missing');
}

const client = redis.createClient(config.redis.port || 6379,
                                  config.redis.host || 'redis');

client.on('ready', () => {
  console.log(chalk.red('Redis: ') + chalk.green('ready'));
})

client.on('error', (err) => {
  console.error(chalk.red('Redis: ') + err.stack);
});

export default client;
