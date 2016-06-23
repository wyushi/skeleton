import * as model from './model';
import * as router from './router';
import localStrategry from './strategies/local.js';

function api(app) {
  setupPassport(app);
  router.attachTo(app);
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

export { api, model };
