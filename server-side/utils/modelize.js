import mongoose from 'mongoose';


export function modelize(name, schema) {

  if (typeof name !== 'string') {
    throw new Error('name should be a string');
  }

  if (! schema instanceof mongoose.Schema) {
    throw new Error('schema need to be a instance of mongoose.Schema');
  }

  try {
    return mongoose.model(name, schema);
  } catch (exception) {
    if (exception.name === 'OverwriteModelError') {
      return mongoose.model(name);
    } else {
      throw exception;
    }
  }
}
