import expect from 'expect';
import User from '../../schemas/User.js';
import { mongoTestSetup as setup } from './mongo.js';


setup();
describe('User Test', () => {
  it('create', (done) => {
    var data = {
      email: 'user@email.com',
      password: '0000'
    };

    User.create(data, (error, user) => {
      expect(error).toNotExist();
      expect(user).toExist();
      expect(user.email).toEqual('user@email.com');
      done();
    });
  });
});


