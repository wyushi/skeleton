import User from './model.js';
import mailgun from 'mailgun-js';
import { mailgun as gunConfig } from '../config.js';
import { confirmMail } from './mail-generator.js';
import { create as createCode, consume as consumeCode } from './activate-code.js';


const route = '/users',
      gun = mailgun(gunConfig);

function sendActivateCode(user, next) {
  createCode(user._id).then((code) => {
    gun.messages().send(confirmMail(user, code));
  }).catch(next);
}

function attachTo(app) {

  app.get(route, (req, res, next) => {
    User.find().exec((error, users) => {
      if (error) { return next(error); }
      res.send(users);
    });
  });

  app.post(route, (req, res, next) => {
    User.create(req.body, (error, user) => {
      if (error) { return next(error); }
      sendActivateCode(user, next);
      res.send(user);
    });
  });

  app.get(route + '/:id', (req, res, next) => {
    User.findOne({ _id: req.params.id })
        .exec((error, user) => {
          if (error) { return next(error); }
          res.send(user);
        });
  });

  app.get(route + '/:id/reactivate',(req, res, next) => {
    User.findOne({ _id: req.params.id })
        .exec((error, user) => {
          if (error) { return next(error); }
          sendActivateCode(user, next);
          res.send(user);
        });
  });

  app.get(route + '/:id/confirm/:code', (req, res, next) => {
    consumeCode(req.params.id, req.params.code)
      .then((code) => {
        User.findOne({ _id: req.params.id })
            .exec((error, user) => {
              if (error) { return next(error); }
              user.activate((error, user) => {
                if (error) { return next(error); }
                res.send(user);
              });
            });
      })
      .catch(next);
  });
}

export { attachTo };
