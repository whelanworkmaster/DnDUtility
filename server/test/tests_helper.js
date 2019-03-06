const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://127.0.0.1:27017/users', { useNewUrlParser: true });
    const connection = mongoose.connection;
    connection.once('open', function() {
        console.log("MongoDB database connection established successfully");
})

beforeEach((done) => {
    connection.collections.users.drop(() => {
        done();
    })
})