import * as _ from 'lodash';

function notEmpty(value) {
  return !_.isEmpty(value);
}

function email(value) {
  var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  return !!re.test(value);
}

export { notEmpty, email }
