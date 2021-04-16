const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  empresa: {
    type: String,
    require: true
  },
  displayName: {
    type: String,
    require: true
  },
  habilitado: {
    type: Boolean,
    required: true
  }
}, {
  strict: true
})

const userModel = mongoose.model('user', UserSchema);

module.exports = userModel;