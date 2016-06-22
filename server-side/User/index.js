import * as model from './model';
import * as router from './router';
import localStrategry from './strategies/local.js';

function attachTo(app) {
  setupPassport(app);
  const User = model.init();
  router.attachTo(User, app);
}

function setupPassport(app) {
  if (!app.passport) {
    throw new Error('passport is not in use.');
  }
  app.passport.use(localStrategry);
  app.passport.serializeUser((user, done) => {
    done(null, user);
  });

  app.passport.deserializeUser((user, done) => {
    done(null, user);
  });
}

export { attachTo };
