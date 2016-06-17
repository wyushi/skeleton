import User from './model.js';


const route = '/users';

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
      res.send(user);
    });
  });
}

export { attachTo };
