const User = require('../model/user.model.js');
const bcrypt = require('bcrypt');

module.exports.addUser = function (newUsername, newPassword) {
    const user = new User({username: newUsername, password: newPassword});
    return user.save();
}

module.exports.getAllUsers = function(res) {
    User.find(function(err, users) {
        if(err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
}

module.exports.getUserByUsername = function(req, res) {
    let username = req.query.username;

    User.findOne({"username" : username}, function(err, user) {
        if(user != null) {
            return res.json(user);
        } else {
            return res.status(400);
        }
    })
}

module.exports.hashPassword = function(password, callback) {
    var BCRYPT_SALT_ROUNDS = 12;
    bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then(function(hashedPassword) {
        return callback(hashedPassword);
    });
}

module.exports.addUserReq = function(req, res) {

    let username = req.body.username;
    let password = req.body.password;
    var self = this;  

    User.findOne({"username" : username}, function(err, user) {
        if(user == null) {
            self.hashPassword(password, function(hashedPassword) {
                self.addUser(username, hashedPassword) 
            });
            return res.send("New User added");
        } else {
            res.status(400)
            return res.send("Failed adding user");
        }
    })

}

module.exports.loginUser = function(req, res) {
    let username = req.body.username;
    let password = req.body.password;

    User.findOne({"username" : username}, function(err, user) {
        if(user != null) {
            bcrypt.compare(password, user.password, function(err, isSame) {
                if(!isSame) {
                    res.status(403);
                    return res.send("Username or password not found");
                } else {
                    res.status(200);
                    return res.send("User authenticated correctly");
                }
            });
        } else {
            res.status(403);
            return res.send("Username or password not found");
        }
    })
    .catch(function(error){
        console.log("Error authenticating user: ");
        console.log(error);
        next();
    });
}