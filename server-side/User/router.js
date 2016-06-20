import User from './model.js';
import mailgun from 'mailgun-js';
import { mailgun as gunConfig } from '../config.js';
import { confirmMail } from './mail-generator.js';
import ActivateCode from './activate-code.js';


const route = '/users',
      gun = mailgun(gunConfig);

function sendActivateCode(user, next) {
  ActivateCode.create(user._id).then((code) => {
    gun.messages().send(confirmMail(user, code.value));
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

  app.post(route + '/:id/confirm', (req, res, next) => {
    ActivateCode
      .consume(req.params.id, req.body.code)
      .then((matched) => {
        if (!matched) { return next(new Error('activate code not match.')); }
        User.findOne({ _id: req.params.id })
            .exec((error, user) => {
              if (error) { return next(error); }
              user.activate((error, user) => {
                if (error) { return next(error); }
                res.send(user);
              });
            });
      }).catch(next);
  });
}

export { attachTo };
