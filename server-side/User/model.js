import mongoose, { Schema } from 'mongoose';
import { modelize } from '../utils/modelize.js';
import * as validate from '../utils/validate.js';
import encrypt from '../utils/encrypt.js';


const userSchema = new Schema({
        email:    { type: String, required: true, unique: true },
        password: { type: String, required: true },
        active:   { type: Boolean, default: false },
        created:  { type: Date, default: Date.now },
        updated:  { type: Date, default: Date.now }
      });

userSchema.statics.create = function (data, callback) {

  callback = callback || function () {};
  validate.required(data, 'email, password');
  validate.notEmpty(data.email, 'email');
  validate.email(data.email);
  validate.notEmpty(data.password, 'password');

  encrypt(data.password, (error, password) => {
    if (error) { return callback(error); }
    var user = new this({
      email: data.email,
      password: password
    });
    user.save(callback);
  }, { algorithm: 'bcrypt' });
};

export default modelize('User', userSchema);
