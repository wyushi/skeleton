import mongoose from 'mongoose';
import loadClass from 'mongoose-class-wrapper';
import bcrypt from 'bcrypt';
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

  static encryptPassword(password) {
    return encrypt(password, { algorithm: 'bcrypt' });
  }

  static create(data) {
    return this.encryptPassword(data.password)
      .then((encrypted) => {
        var user = new this({
          email: data.email,
          password: encrypted
        });
        return user.save();
      });
  }

  verifyPassword(password) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, this.password, (err, matched) => {
        if (err) { return reject(err); }
        resolve(matched);
      })
    });
  }

  activate() {
    this.active = true;
    return this.save();
  }
}

userSchema.set('toJSON', {
  transform: (doc, ret, options) => {
    delete ret.password;
    delete ret.__v;
  }
});
userSchema.plugin(loadClass, UserModel);
export default mongoose.model('User', userSchema);
