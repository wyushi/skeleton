import mongoose from 'mongoose';
import loadClass from 'mongoose-class-wrapper';
import * as Validator from '../utils/validator.js'
import { promise as encrypt } from '../utils/encrypt.js';


const userSchema = new mongoose.Schema({
        email: {
          type: String,
          validate: [
            { validator: Validator.notEmpty, msg: 'email can not be empty.'},
            { validator: Validator.email,    msg: '{VALUE} is invalide.'}
          ],
          required: [true, 'email is required'],
          unique: [true, 'email is already been used']
        },
        password: {
          type: String,
          validate: [
            { validator: Validator.notEmpty, msg: 'password can not be empty.'}
          ],
          required: [true, 'password is required']
        },
        active:   { type: Boolean, default: false },
        created:  { type: Date, default: Date.now },
        updated:  { type: Date, default: Date.now }
      });

class UserModel {

  static create(data, callback) {
    callback = callback || function () {};
    encrypt(data.password, { algorithm: 'bcrypt' })
      .then((password) => {
        var user = new this({
          email: data.email,
          password: password
        });
        user.save(callback);
      })
      .catch((error) => {
        callback(error);
      });
  }

  activate(callback) {
    callback = callback || function () {};
    this.active = true;
    this.save(callback);
  }
}

userSchema.plugin(loadClass, UserModel);
export default mongoose.model('User', userSchema);
