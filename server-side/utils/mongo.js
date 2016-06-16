import mongoose from 'mongoose';

const connection = mongoose.connection,
      dbHost = 'mongo',
      dbPort = 27017,
      dbName = 'test';


export function mongoTestSetup() {
  before(function (done) {
    function clearDB() {
      for (var i in connection.collections) {
        connection.collections[i].remove(function () {});
      }
      return done();
    }

    connection.on('error', console.error);
    connection.once('open', function () {
      return clearDB();
    });
    mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`);
  });

  after(function (done) {
    connection.close(done);
  });
}

