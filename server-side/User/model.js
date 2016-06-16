import mongoose, { Schema } from 'mongoose';
import { modelize } from '../utils/modelize.js';

const userSchema = new Schema({
        email:    { type: String, required: true, unique: true },
        password: { type: String, required: true },
        active:   { type: Boolean, default: false },
        created:  { type: Date, default: Date.now },
        updated:  { type: Date, default: Date.now }
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
        password: data.password
      });

  user.save((error, user) => {
    callback(error, user);
  });
};

export default modelize('User', userSchema);
