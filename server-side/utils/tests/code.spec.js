import expect from 'expect';
import redis from 'redis';
import Code from '../code.js';

describe('User Activate Code Test', () => {

  const id = "abc123456789",
        store = redis.createClient(6379, 'redis');

  it('create', (done) => {
    Code.create(store, id)
        .then((code) => {
          expect(code).toExist();
          expect(code.value).toExist();
          expect(code.value.length).toBe(6);
          done();
        });
  });

  describe('consume', () => {
    var backup;

    before((done) => {
      Code.create(store, id)
          .then((code) => {
            backup = code;
            done();
          });
    });

    it('should success', (done) => {
      Code.consume(store, id, backup.value)
          .then((matched) => {
            expect(matched).toBe(true);
            done();
          });
    });

    it('should fail', (done) => {
      Code.consume(store, id, '000000')
          .then((matched) => {
            expect(matched).toBe(false);
            done();
          });
    });
  });
});
