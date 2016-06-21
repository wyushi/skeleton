import mailgun from 'mailgun-js';
import chalk from 'chalk';
import { mailgun as gunConfig } from '../config.js';
import User from './model.js';
import { confirmMail } from './mail-generator.js';
import ActivateCode from './activate-code.js';


const route = '/users',
      gun = mailgun(gunConfig);

function sendActivateCode(user, next) {
  ActivateCode
    .create(user.id)
    .then((code) => {
      gun.messages().send(confirmMail(user, code.value));
      console.log(chalk.blue('Code ' + code.value + ' send to ' + user.email));
    }).catch(next);
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
          sendActivateCode(user, next);
          res.send(user);
        }).catch(next);
  });

  app.get(route + '/:id', (req, res, next) => {
    User.findOne({ _id: req.params.id }).exec()
        .then((user) => {
          res.send(user);
        }).catch(next);
  });

  app.get(route + '/:id/reactivate',(req, res, next) => {
    User.findOne({ _id: req.params.id }).exec()
        .then((user) => {
          sendActivateCode(user, next);
          res.send(user);
        }).catch(next);
  });

  app.post(route + '/:id/confirm', (req, res, next) => {
    ActivateCode
      .consume(req.params.id, req.body.code)
      .then((matched) => {
        if (!matched) { throw new Error('activate code not match.'); }
        return User.findOne({ _id: req.params.id }).exec();
      })
      .then((user) => {
        return user.activate();
      })
      .then((user) => {
        res.send(user);
      }).catch(next);
  });
}

export { attachTo };
