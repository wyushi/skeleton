import expect from 'expect';
import { ActivateCode as Code } from '../activate-code.js';

describe('User Activate Code Test', () => {
  const id = "abc123456789";

  it('create', (done) => {
    Code.create(id)
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
      Code.create(id)
          .then((code) => {
            backup = code;
            done();
          });
    });

    it('should success', (done) => {
      Code.consume(id, backup.value)
          .then((matched) => {
            expect(matched).toBe(true);
            done();
          });
    });

    it('should fail', (done) => {
      Code.consume(id, '000000')
          .then((matched) => {
            expect(matched).toBe(false);
            done();
          });
    });
  });
});
