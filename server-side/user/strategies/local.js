import { Strategy as LocalStrategy } from 'passport-local';
import * as ERROR from '../error.js';
import User from '../model.js';

const localStrategy = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false
  },
  (email, password, done) => {
    User.findByEmail(email)
        .then((user) => {
          if (!user) { throw ERROR.notFound(); }
          return user.verifyPassword(password);
        }).then((user) => {
          if (!user) { throw ERROR.passwordNotMatch(); }
          if (!user.active) { throw ERROR.notActiveted(); }
          done(null, user);
        }).catch(done);
  });

export default localStrategy;
