const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./user.model.js');


module.exports.connectToDB = function () {
    mongoose.connect('mongodb://127.0.0.1:27017/users', { useNewUrlParser: true });
    const connection = mongoose.connection;
    connection.once('open', function() {
        console.log("MongoDB database connection established successfully");
    })
}

module.exports.addUser = function (newUsername, newPassword) {
    const user = new User({username: newUsername, password: newPassword});
    return user.save();
}

module.exports.hashPassword = function(password, fn) {
    var BCRYPT_SALT_ROUNDS = 12;
    bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then(function(hashPassword) {
        console.log("new password: ", hashPassword);
        fn(hashPassword);
    });
}

module.exports.comparePasswords = function(password, hash) {
    bcrypt.compare(password, hash).then(function(res) {
        return res;
    })
}