const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Note = new Schema({
    username: {
        type: String,
        required: [true]
    },
    note: {
        type: String,
        required: [true]
    }
})

module.exports = mongoose.model('Note', Note);