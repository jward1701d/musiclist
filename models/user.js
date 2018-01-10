const mongoose = require('mongoose');

const Shema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Shema({
  username: String,
  password: { type: String, select: false },
  fisrtName: String,
  lastName: String,
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
