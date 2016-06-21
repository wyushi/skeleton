import * as model from './model';
import * as router from './router';
import localStrategry from './strategies/local.js';

function attachTo(app) {
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
  router.attachTo(app);
}

export { attachTo };
