var db = require('../controller/db');
var assert = require('assert');
const bcrypt = require('bcrypt');

let testUsername = 'testUser';
let testPassword = 'testPass';



describe('addUser()', function () {

    it('should add a user to the User table in MongoDB', function(done) {
        let user = db.addUser(testUsername, testPassword)
        user.then(() => {
            assert(!user.isNew);
            done();
        });
    });

})

describe('getUsers()', function() {

    it('should return all the users in the table', function(done) {
        let res = {
            json: function(users) {
                var isSameUsername = (users[0].username === testUsername);
                var isSamePassword = (users[0].password === testPassword);
                assert(isSameUsername && isSamePassword);
                done();
            }
        };

        db.addUser(testUsername, testPassword).then(() => {
            db.getAllUsers(res);
        })
    })

})

describe('getUserByUsername()', function() {

    it('should return the specfified user in the db', function(done) {
        let req = { query: {username: testUsername}};
        let res = {
            json: function(user) {
                var isSameUsername = (user.username === testUsername);
                var isSamePassword = (user.password === testPassword);
                assert(isSameUsername && isSamePassword);
                done();
            }
        };

        db.addUser(testUsername, testPassword).then(() => {
            db.getUserByUsername(req, res);
        })
    })

})

describe('hashPassword', function() {

    it('should hash the password and return a true compare with same pass', function(done) {
        db.hashPassword(testPassword, function(hashedPassword) {
            bcrypt.compare(testPassword, hashedPassword, function(err, isSamePassword) {
                assert(isSamePassword);
                done();
            })
        });
    })

})

describe('addUserReq()', function() {

    let req = { body: {
        username: testUsername,
        password: testPassword
    }};

    it('should add user to db with hashed password if not present', function(done) {
        
        let res = {
            send: function(res){}
        }
        
        let lookupReq = { query: {username: testUsername}};
        let lookupRes = {
            json: function(result) {
                bcrypt.compare(req.body.password, result.password, function(err, isSamePassword) {
                    assert(req.body.username === result.username && isSamePassword);
                    done();
                })
            }
        }

        db.addUserReq(req, res);
        setTimeout(function () {
            db.getUserByUsername(lookupReq, lookupRes);
        }, 1000);

    })

    it('should not add a user and return failure since user already present', function(done) {
        
        let res = {
            send: function(added) { },
            status: function(response) {
                assert(response === 400)
                done();
            }
        }

        db.addUserReq(req, res);
        setTimeout(function () {
            db.addUserReq(req, res);
        }, 1000)

    })
})