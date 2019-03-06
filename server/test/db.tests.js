var expect = require('chai').expect;
var db = require('../login/db');
var User = require('../login/user.model');
var assert = require('assert');
var bcrypt = require('bcrypt');

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