import { Strategy as LocalStrategy } from 'passport-local';
import User from '../model.js';

const localStrategy = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false
  },
  (username, password, done) => {
    var verified;
    User.findOne({ email: username }).exec()
        .then((user) => {
          if (!user) { done(null, false); }
          verified = user;
          return user.verifyPassword(password);
        })
        .then((matched) => {
          matched ? done(null, verified) : done(null, false, { message: 'Invalid password' });
        }).catch(done);
  });

export default localStrategy;
