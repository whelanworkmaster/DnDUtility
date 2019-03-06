var expect = require('chai').expect;
var db = require('../login/db');
var User = require('../login/user.model');
var assert = require('assert');
var bcrypt = require('bcrypt');

// describe('getUsers()', function () {
//     it('should get a list of users', function() {
//         // Arrange

//         // Act
//         db.getUsers();
//     });
// });

describe('addUser()', function () {
    it('should add a user to the User table in MongoDB', function(done) {
        let username = 'testUser';
        let password = 'testPassword'
        let user = db.addUser(username, password)
            .then(() => {
                assert(!user.isNew);
                done();
        });
    });
})

describe('hashPassword()', function () {
    it('should hash a string and return the same hash for the same string', function(done) {
        let testPassword = 'testPassword';
        let hashedPassword;
        db.hashPassword(testPassword, function(result) {
            hashedPassword = result;
        });
        console.log(hashedPassword);
        bcrypt.compare(testPassword, hashedPassword, function(err, res){
            let result = res;
            console.log("result: " + res);
        });
        done();
    });
});

describe('comparePasswords()', function () {
    it('should should return true if the same password is compared to its hash', function(done) {
        let testPassword = 'password1';
        let saltRounds = 12;
        db.comparePasswords(testPassword, bcrypt.hash)
    })
})