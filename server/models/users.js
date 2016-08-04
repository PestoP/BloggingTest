var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  email: { type: String },
  admin: { type: Boolean }
});


module.exports = mongoose.model('User', UserSchema);
