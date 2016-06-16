import User from './model.js';


const route = '/users';

function attachTo(app) {

  app.post(route, (req, res) => {
    User.create(req.body, (error, user) => {
      if (error) {
        console.log(error);
      }
      res.send({
        error: error,
        user: user
      });
    });
  });
}

export { attachTo };
