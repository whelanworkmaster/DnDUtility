var userController = require('../../controller/user.controller');
var assert = require('assert');
const bcrypt = require('bcrypt');

let testUsername = 'testUser';
let testPassword = 'testPass';

let testTimeout = 500;



describe('addUser()', function () {

    it('should add a user to the User table in MongoDB', function(done) {
        let user = userController.addUser(testUsername, testPassword)
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

        userController.addUser(testUsername, testPassword).then(() => {
            userController.getAllUsers(res);
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

        userController.addUser(testUsername, testPassword).then(() => {
            userController.getUserByUsername(req, res);
        })
    })

})

describe('hashPassword', function() {

    it('should hash the password and return a true compare with same pass', function(done) {
        userController.hashPassword(testPassword, function(hashedPassword) {
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

        userController.addUserReq(req, res);
        setTimeout(function () {
            userController.getUserByUsername(lookupReq, lookupRes);
        }, testTimeout);

    })

    it('should not add a user and return failure since user already present', function(done) {
        
        let res = {
            send: function(added) { },
            status: function(response) {
                assert(response === 400)
                done();
            }
        }

        userController.addUserReq(req, res);
        setTimeout(function () {
            userController.addUserReq(req, res);
        }, testTimeout)

    })
})

describe("loginUser()", function() {
    let addRes = {send: function(res){}}

    let req = { body: {
        username: testUsername,
        password: testPassword
    }};

    it('Should return true if the user can login, password matches one in db', function(done) {

        let loginRes = {
            send: function(response) {
                assert(response === 'User authenticated correctly')
                done();
            },
            status: function(response) {
                assert(response === 200);
            }
        }
        
        userController.addUserReq(req, addRes);
        setTimeout(function () {
            userController.loginUser(req, loginRes);
        }, testTimeout)

    })

    it('Should should fail if the user is found but the password is diff', function(done) {

        let loginReq = { body: {
            username: testUsername,
            password: 'differentPassword'
        }}
        let loginRes = {
            send: function(response) {
                assert(response === 'Username or password not found')
                done();
            },
            status: function(response) {
                assert(response === 403);
            }
        }
        
        userController.addUserReq(req, addRes);
        setTimeout(function () {
            userController.loginUser(loginReq, loginRes);
        }, testTimeout)

    })

    it('Should should fail if the user is not found', function(done) {

        let loginRes = {
            send: function(response) {
                assert(response === 'Username or password not found')
                done();
            },
            status: function(response) {
                assert(response === 403);
            }
        }
        
        userController.loginUser(req, loginRes);
        
    })

})