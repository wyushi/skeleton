import HttpStatus from 'http-status-codes';

function notFound(name, status) {
  var error =  new Error(`User (${name}) is not found.`);
  error.status = status || HttpStatus.BAD_REQUEST;
  return error;
}

function codeNotMatch(code, status) {
  var error = new Error(`Code (${code}) is not match.`);
  error.status = status || HttpStatus.BAD_REQUEST;
}

export { notFound, codeNotMatch };
