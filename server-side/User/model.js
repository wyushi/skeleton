import mongoose from 'mongoose';
import loadClass from 'mongoose-class-wrapper';
import mongoosastic from 'mongoosastic';
import bcrypt from 'bcrypt';
import * as Validator from '../utils/validator.js'
import { promise as encrypt } from '../utils/encrypt.js';
import elasticSearch from '../utils/elastic-search.js';


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

  static encryptPassword(password) {
    return encrypt(password, { algorithm: 'bcrypt' });
  }

  static all() {
    return this.find().exec();
  }

  static findById(id) {
    return this.findOne({ _id: id }).exec();
  }

  static findByEmail(email) {
    return this.findOne({ email: email }).exec();
  }

  verifyPassword(password) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, this.password, (err, matched) => {
        if (err) { return reject(err); }
        if (!matched) { return resolve(false); }
        resolve(matched);
      });
    });
  }

  resetPassword(password) {
    return UserModel.encryptPassword(password)
      .then((encrypted) => {
        this.password = encrypted;
        return this.save();
      });
  }

  activate() {
    this.active = true;
    return this.save();
  }
}

userSchema.set('toObject', {
  transform: (doc, ret, options) => {
    delete ret._id;
    ret.id = doc.id;
    delete ret.password;
  }
});
userSchema.plugin(loadClass, UserModel);
userSchema.plugin(mongoosastic, {
  esClient: elasticSearch,
  index: 'users',
  type: 'user'
});

export default mongoose.model('User', userSchema);
