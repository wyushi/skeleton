import redis from 'redis';
import { redis as config } from '../config.js';
import randomString from '../utils/random-string.js';


const codeLength = 6,
      codeBase = '1234567890',
      store = redis.createClient(config.port, config.host);

function create(id) {
  const code = randomString(codeLength, codeBase),
        key = id.toString();
  return new Promise((resolve, reject) => {
    store.set(key, code, (error, res) => {
      if (error) { reject(error); }
      else { resolve(code); }
    });
  });
}

function consume(id, code) {
  const key = id.toString();
  return new Promise((resolve, reject) => {
    store.get(key, (error, reply) => {
      if (error) { reject(error); }
      if (reply !== code) { reject(code); }
      store.del(id, (error, reply) => {
        if (error) { reject(error); }
        resolve(reply);
      });
    });
  });
}

class ActivateCode {

  constructor(key) {
    this.value = randomString(codeLength, codeBase);
    this.created = Date.now();
  }

  static create(key) {
    var code = new ActivateCode(key);
    return new Promise((resolve, reject) => {
      store.set(key, code, (error, res) => {
        if (error) { return reject(error); }
        resolve(code);
      });
    });
  }

  static consume(key, value) {
    return new Promise((resolve, reject) => {
      store.get(key, (error, code) => {
        if (error) { return reject(error); }
        if (value !== code.value) {
          return resolve(false);
        }
        store.del(key, (error) => {
          if (error) { return reject(error); }
          resolve(true);
        })
      });
    });
  }
}

export { create, consume, ActivateCode };
