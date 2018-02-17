const mongoose = require('mongoose');

const dbName = "places_cf";

module.exports = {
  connect: () => mongoose.connect("mongodb://localhost/" + dbName),
  dbName,
  connection: () => {
    if(mongoose.connection)
      return mongoose.connection;
    return this.connect();
  }
}
