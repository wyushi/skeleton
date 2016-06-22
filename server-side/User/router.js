import mailgun from 'mailgun-js';
import chalk from 'chalk';
import HttpStatus from 'http-status-codes';
import { mailgun as gunConfig } from '../config.js';
import User from './model.js';
import { confirmMail } from './mail-generator.js';
import ActivateCode from './activate-code.js';
import ERROR from './error.js';


const route = '/users',
      gun = mailgun(gunConfig);

function sendCode(user, next) {
  ActivateCode
    .create(user.email)
    .then((code) => {
      gun.messages().send(confirmMail(user, code.value));
      console.log(chalk.blue('Code ' + code.value + ' send to ' + user.email));
    }).catch(next);
}

function findUser(email, code) {
  return ActivateCode
      .consume(email, code)
      .then((matched) => {
        if (!matched) { throw ERROR.codeNotMatch(code); }
        return User.findOne({ email: email }).exec();
      });
}

function attachTo(app) {

  const passport = app.passport;

  app.post('/login', passport.authenticate('local'),
    (req, res, next) => {
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
    User.findOne({ _id: req.params.id }).exec()
        .then((user) => {
          if (!user) { throw ERROR.notFound('placeholder'); }
          res.send(user);
        }).catch(next);
  });

  app.post(route + '/request_code', (req, res, next) => {
    User.findOne({ email: req.body.email }).exec()
        .then((user) => {
          if (!user) { throw ERROR.notFound('placeholder'); }
          sendCode(user, next);
          res.send(user);
        }).catch(next);
  });

  app.post(route + '/reset_password', (req, res, next) => {
    findUser(req.body.email, req.body.code)
      .then((user) => {
        if (!user) { throw ERROR.notFound('placeholder'); }
        return user.resetPassword(req.body.password);
      })
      .then((user) => {
        res.send(user);
      })
      .catch(next);
  });

  app.post(route + '/activate', (req, res, next) => {
    findUser(req.body.email, req.body.code)
      .then((user) => {
        if (!user) { throw ERROR.notFound('placeholder'); }
        return user.activate();
      })
      .then((user) => {
        res.send(user);
      }).catch(next);
  });
}

export { attachTo };
