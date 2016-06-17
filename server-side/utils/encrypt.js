import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

const BCRYPT_COST = 12;

function encrypt(plainText, callback, options) {
  options = options || {};
  callback = callback || function (err, hashedText) {};

  if (typeof plainText !== 'string') {
    callback('Invalid Parameter Error!', null);
    return;
  }

  switch (options.algorithm) {
    case 'bcrypt':
      bcrypt.hash(plainText, BCRYPT_COST, callback);
      return;
    default:
      return crypto.createHash('sha1').update(plainText).digest('hex');
  }
}

export default encrypt;
