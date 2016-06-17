'use strict';

var expect    = require('expect'),
    validate  = require('../validate.js');


describe('Utils Validate Test', function () {

  it('required', function (done) {
    var required = validate.required;

    expect(function () {
      required(null, '');
    }).toThrow(/ must be defined./);

    expect(function () {
      required(undefined, '');
    }).toThrow(/ must be defined./);

    expect(function () {
      required(NaN, '');
    }).toThrow(/ must be defined./);

    expect(function () {
      required(0, '');
    }).toThrow(/ must be defined./);

    expect(function () {
      required(false, '');
    }).toThrow(/ must be defined./);

    expect(function () {
      required('', '');
    }).toThrow(/ must be defined./);

    expect(function () {
      required([], '');
    }).toNotThrow(/ can not be empty./);

    expect(function () {
      required({}, '');
    }).toNotThrow(/ can not be empty./);

    done();
  });

  it('notEmpty', function (done) {
    var notEmpty = validate.notEmpty;

    expect(function () {
      notEmpty(null, '');
    }).toThrow(/ can not be empty./);

    expect(function () {
      notEmpty('', '');
    }).toThrow(/ can not be empty./);

    expect(function () {
      notEmpty([], '');
    }).toThrow(/ can not be empty./);

    expect(function () {
      notEmpty({}, '');
    }).toThrow(/ can not be empty./);

    done();
  });

});
