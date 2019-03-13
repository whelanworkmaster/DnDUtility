const mongoose = require('mongoose');
const router = require('../routes/router');

mongoose.Promise = global.Promise;

let connection;
router.connectToDB(function(madeConnection) {
    connection = madeConnection;
})

beforeEach((done) => {
    connection.collections.users.drop(() => {
        connection.collections.notes.drop(() => {
            done();
        })
    })
})