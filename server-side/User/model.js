import mongoose, { Schema } from 'mongoose';
import { modelize } from '../utils/modelize.js';

const userSchema = new Schema({
        email: String,
        password: String,
        active: Boolean
      });

userSchema.statics.create = function (data, callback) {

  if (!data.email || data.email.length === 0) {
    callback(new Error('fields required: email'));
    return;
  }

  if (!data.password || data.password.length === 0) {
    callback(new Error('fields required: password'));
    return;
  }

  var user = new this({
        email: data.email,
        password: data.password,
        active: false
      });

  user.save((error, user) => {
    callback(error, user);
  });
};

export default modelize('User', userSchema);
