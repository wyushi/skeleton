import fs from 'fs';


export const host = 'localhost';
export const port = 3000;
export const credentials = {
  key: fs.readFileSync(__dirname + '/ssl/key.pem', 'utf8'),
  cert: fs.readFileSync(__dirname + '/ssl/cert.pem', 'utf8'),
  passphrase: '0000'
};
export const redis = {
  host: 'redis',
  port: 6379
};
export const mongo = {
  host: 'mongo',
  port: 27017,
  name: 'dev'
};
export const mailgun = {
  apiKey: '',
  domain: ''
};

