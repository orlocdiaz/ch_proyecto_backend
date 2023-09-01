const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(MONGODB_URI, mongooseOptions)
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Cannot connect to DB:', error);
  });

module.exports = mongoose;
