import expect from 'expect';
import User from '../model.js';
import { mongoTestSetup as setup } from '../../utils/mongo.js';


setup();
describe('User Test', () => {
  it('create', (done) => {
    var data = {
      email: 'user@email.com',
      password: '0000'
    };

    User.create(data)
        .then((user) => {
          expect(user).toExist();
          expect(user.email).toEqual('user@email.com');
          done();
        });
  });
});


