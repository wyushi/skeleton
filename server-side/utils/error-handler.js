import chalk from 'chalk';
import HttpStatus from 'http-status-codes';


function onError(err, req, res, next) {
  const status = err.status || HttpStatus.INTERNAL_SERVER_ERROR;
  console.error(chalk.red('Error: ') + err.stack);
  res.status(status).send(err.stack);
}

export default onError;
