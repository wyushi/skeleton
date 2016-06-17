import expect from 'expect';
import { create, consume } from '../activate-code.js';

describe('User Activate Code Test', () => {
  const id = "abc123456789";

  it('create', (done) => {
    create(id)
      .then((code) => {
        expect(code).toExist();
        done();
      })
      .catch((error) => {
        expect(error).toNotExist();
        done();
      });
  });

  describe('consume', () => {
    var backup;

    before((done) => {
      create(id)
        .then((code) => {
          backup = code;
          expect(code).toExist();
          done();
        });
    });

    it('should success', (done) => {
      consume(id, backup)
        .then((code) => {
          expect(code).toExist();
          done();
        })
        .catch((error) => {
          expect(error).toNotExist();
          done();
        });
    });

    it('should fail', (done) => {
      consume(id, '000000')
        .then((code) => {
          expect(code).toNotExist();
          done();
        })
        .catch((error) => {
          expect(error).toExist();
          done();
        });
    });
  });
});
