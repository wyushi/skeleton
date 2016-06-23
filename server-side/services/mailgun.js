import mailgun from 'mailgun-js';
import * as config from '../config.js';

if (!config.mailgun) {
  throw new Error('mailgun config is missing');
}

export default mailgun(config.mailgun);
