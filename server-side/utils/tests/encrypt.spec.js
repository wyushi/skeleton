'use strict';
var expect = require('expect');
var encrypt = require('../encrypt.js').encrypt;

describe('Utils Encrypt Test', function () {
  var plainText = 'some text';

  describe('bcrypt', function () {
    it('should hash a plain text', function (done) {
      encrypt(plainText, function (err, hashedText) {
        expect(err).toNotExist();
        expect(hashedText).toExist();
        expect(hashedText.length).toBe(60);
        done();
      }, {
        algorithm: 'bcrypt'
      });
    });

    it('should hash a plain text2', function (done) {
      encrypt(plainText, function (err, hashedText) {
        expect(err).toNotExist();
        expect(hashedText).toExist();
        expect(hashedText.length).toBe(60);
        done();
      }, {
        algorithm: 'bcrypt'
      });
    });
  });

  describe('sha1', function () {
    it('should hash a plain text', function () {
      var hashedText = encrypt(plainText);
      expect(hashedText).toExist();
      expect(hashedText.length).toBe(40);
    });
  });
});
