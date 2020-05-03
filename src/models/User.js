const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:String,
    faceid:String,
});

module.exports = mongoose.model('User', UserSchema);