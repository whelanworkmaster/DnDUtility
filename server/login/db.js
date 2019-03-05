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

module.exports.hashPassword = function(password, cb) {
    var BCRYPT_SALT_ROUNDS = 12;

    bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
        .then(function(hashedPassword) {
            cb(hashedPassword);
    });
}

module.exports.getUsers = function() {
    User.find(function(err, users) {
        if(err) {
            return console.log(err);
        } else {
            console.log("Users found");
            console.log(JSON.stringify(users));
            return users;
        }
    })
}

exports.addUser = function(newUsername, newPassword) {
    console.log("new Username: " + newUsername, "new Password: " + newPassword);
    let newUser = new User({
        username: newUsername, 
        password: newPassword
    });
    return newUser;
}