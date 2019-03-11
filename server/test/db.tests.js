var db = require('../controller/db');
var assert = require('assert');

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

    let testUsername = 'testUser';
    let testPassword = 'testPass';

    let req = { body: {} };
    let res = {
        json: function(users) {
            var isSameUsername = users[0].username === testUsername;
            var isSamePassword = users[0].password === testPassword;
            assert(isSameUsername && isSamePassword);
        }
    };

    it('should return all the users in the table', function() {
        db.addUser(testUsername, testPassword).then(() => {
            db.getAllUsers(req, res);
        })
    })
})