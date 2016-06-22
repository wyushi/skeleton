import mailgun from 'mailgun-js';
import chalk from 'chalk';
import HttpStatus from 'http-status-codes';
import { mailgun as gunConfig } from '../config.js';
import User from './model.js';
import { confirmMail } from './mail-generator.js';
import DigitCode from './code.js';
import ERROR from './error.js';


const route = '/users',
      gun = mailgun(gunConfig);

function sendCode(user, next) {
  DigitCode
    .create(user.email)
    .then((code) => {
      gun.messages().send(confirmMail(user, code.value));
      console.log(chalk.blue('Code ' + code.value + ' send to ' + user.email));
    }).catch(next);
}

function checkCode(email, code) {
  return DigitCode
          .consume(email, code)
          .then((matched) => {
            if (!matched) { throw ERROR.codeNotMatch(code); }
            return User.findOne({ email: email }).exec();
          });
}

function attachTo(app) {

  const passport = app.passport,
        auth = passport.authenticate('local');

  app.post('/login', auth, (req, res, next) => {
    res.send(req.user);
  });

  app.get(route, (req, res, next) => {
    User.find().exec()
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

    User.findOne({ _id: id }).exec()
        .then((user) => {
          if (!user) { throw ERROR.notFound(id); }
          res.send(user);
        }).catch(next);
  });

  app.post(route + '/request_code', (req, res, next) => {
    const email = req.body.email;

    User.findOne({ email: email }).exec()
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
