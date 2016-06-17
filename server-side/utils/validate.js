import * as _ from 'lodash';

function required(value, msg) {
  if (!value) {
    throw error(msg + ' must be defined.');
  }
}

function exist(value, msg) {
  if (!value) {
    throw error(msg + ' is not exist.');
  }
}

function notExist(value, msg) {
  if (value) {
    throw error(msg + ' is already exist.');
  }
}

function notEmpty(value, msg) {
  if (_.isEmpty(value)) {
    throw error(msg + ' can not be empty.');
  }
}

function email(value) {
  var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  if (!re.test(value)) {
    throw error('Email address (' + value + ')  is invalid.');
  }
}

function handleError(err, req, res, next) {
  if (err.type !== 'validate') { return next(err); }
  console.error('--- Handling Validation Error ---');
  console.error(err.stack);
  res.status(422).send(err.toString());
}

function error(msg) {
  var err = new Error(msg);
  err.type = 'validate';
  return err;
}

export { required, exist, notExist, notEmpty, email, handleError }
