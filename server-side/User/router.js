import User from './model.js';
import mailgun from 'mailgun-js';
import { mailgun as gunConfig } from '../config.js';


const route = '/users',
      gun = mailgun(gunConfig);

function attachTo(app) {

  app.get(route, (req, res, next) => {
    User.find().exec((error, users) => {
      if (error) { return next(error); }
      res.status(200).send(users);
    });
  });

  app.post(route, (req, res, next) => {
    User.create(req.body, (error, user) => {
      if (error) { return next(error); }
      console.log(user.email);
      var mail = {
        from: 'Skeleton Server <mail@yushiwang.ca>',
        to: user.email,
        subject: 'Hello from Skeleton Server',
        text: 'Happy to see this message.'
      };
      gun.messages().send(mail, (error, body) => {
        if (error) { return next(error); }
        else { console.log(body); }
      })
      res.send(user);
    });
  });
}

export { attachTo };
