const mongoose = require('mongoose');
const User = require('../model/user.model.js');


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

module.exports.getAllUsers = function(req, res) {
    User.find(function(err, users) {
        if(err) {
            console.log(err);
            err;
        } else {
            res.json(users);
        }
    })
}