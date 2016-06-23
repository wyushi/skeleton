import chalk from 'chalk';
import HttpStatus from 'http-status-codes';
import DigitCode from '../utils/code.js';
import redis from '../services/redis.js';
import mailgun from '../services/mailgun.js';
import User from './model.js';
import { confirmMail } from './utils/mail.js';
import ERROR from './utils/error.js';



const route = '/users';

function attachTo(app) {

  const auth = app.passport.authenticate('local');

  function sendCode(user, next) {
    DigitCode
      .create(redis, user.email)
      .then((code) => {
        mailgun.messages().send(confirmMail(user, code.value));
        console.log(chalk.blue('Code ' + code.value + ' send to ' + user.email));
      }).catch(next);
  }

  function checkCode(email, code) {
    return DigitCode
            .consume(redis, email, code)
            .then((matched) => {
              if (!matched) { throw ERROR.codeNotMatch(code); }
              return User.findByEmail(email);
            });
  }

  app.post('/login', auth, (req, res, next) => {
    res.send(req.user);
  });

  app.get(route, (req, res, next) => {
    User.eAll()
        .then((users) => {
          res.send(users);
        }).catch(next);
  });

  app.post(route, (req, res, next) => {
    User.create(req.body)
        .then((user) => {
          sendCode(user, next);
          res.send(user);
        }).catch(next);
  });

  app.get(route + '/:id', (req, res, next) => {
    const id = req.params.id;

    User.findById(id)
        .then((user) => {
          if (!user) { throw ERROR.notFound(id); }
          res.send(user);
        }).catch(next);
  });

  app.post(route + '/request_code', (req, res, next) => {
    const email = req.body.email;

    User.findByEmail(email)
        .then((user) => {
          if (!user) { throw ERROR.notFound(email); }
          sendCode(user, next);
          res.send(user);
        }).catch(next);
  });

  app.post(route + '/reset_password', (req, res, next) => {
    const email = req.body.email,
          code = req.body.code,
          password = req.body.password;

    checkCode(email, code)
      .then((user) => {
        if (!user) { throw ERROR.notFound(email); }
        return user.resetPassword(password);
      }).then((user) => {
        res.send(user);
      }).catch(next);
  });

  app.post(route + '/activate', (req, res, next) => {
    const email = req.body.email,
          code = req.body.code;

    checkCode(email, code)
      .then((user) => {
        if (!user) { throw ERROR.notFound(email); }
        return user.activate();
      }).then((user) => {
        res.send(user);
      }).catch(next);
  });
}

export { attachTo };
