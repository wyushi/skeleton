import HttpStatus from 'http-status-codes';

function notFound(name, status) {
  var error =  new Error(`User (${name}) is not found.`);
  error.status = status || HttpStatus.BAD_REQUEST;
  return error;
}

function codeNotMatch(code, status) {
  var error = new Error(`Code (${code}) is not match.`);
  error.status = status || HttpStatus.BAD_REQUEST;
  return error;
}

function passwordNotMatch(status) {
  var error = new Error(`Password not match.`);
  error.status = status || HttpStatus.UNAUTHORIZED;
  return error;
}

function notActiveted(status) {
  var error = new Error(`User is unactivated`);
  error.status = status || HttpStatus.FORBIDDEN;
  return error;
}

export { notFound, codeNotMatch, passwordNotMatch, notActiveted };
