var db = require('../controller/db');
var assert = require('assert');

let testUsername = 'testUser';
let testPassword = 'testPass';

describe('addUser()', function (done) {
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

describe('getUsers()', function(done) {

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

describe('getUserByUsername()', function(done) {

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