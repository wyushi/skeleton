import redis from 'redis';
import { redis as config } from '../config.js';
import randomString from '../utils/random-string.js';


const codeLength = 6,
      codeBase = '1234567890',
      store = redis.createClient(config.port, config.host);

class ActivateCode {

  constructor(key) {
    this.key = key;
    this.value = randomString(codeLength, codeBase);
    this.created = Date.now();
  }

  static create(key) {
    const code = new ActivateCode(key),
          codeStr = JSON.stringify(code);
    return new Promise((resolve, reject) => {
      store.set(key, codeStr, (error, res) => {
        if (error) { return reject(error); }
        resolve(code);
      });
    });
  }

  static consume(key, value) {
    return new Promise((resolve, reject) => {
      store.get(key, (error, codeStr) => {
        if (error) { return reject(error); }
        const code = JSON.parse(codeStr);
        if (!code || value !== code.value) {
          return resolve(false);
        }
        store.del(key, (error) => {
          if (error) { return reject(error); }
          resolve(true);
        });
      });
    });
  }
}

export default ActivateCode;
