var assert = require('assert');
var notesController = require('../../controller/note.controller');

let testUser = 'testUser';
let testNote = 'These are test notes, a user types these in the front end';
let timeout = 1000;

describe('addNotes', function() {

    let addReq = { body: {
        username: testUser,
        note: testNote
    }};

    it('should succesfully save the notes document to the db', function(done) {
        let note = notesController.addNote(testUser, testNote)
        note.then(() => {
            assert(!note.isNew);
            done();
        })
    })

    it('should save a note from a req to the db, api version', function(done) {
        
        let addRes = {
            status: function(response) {},
            send: function(send) {}
        }
        let getReq = { query: { username: testUser } };
        let getRes = {
            json: function(note) {
                var isSameUsername = (note.username === testUser);
                var isSameNote = (note.note === testNote);
                assert(isSameUsername && isSameNote);
                done();
            },
            status: function(status){}
        }

        notesController.addNoteReq(addReq, addRes);
        setTimeout(function () {
            notesController.getNoteByUsername(getReq, getRes)
        }, timeout)
    })

})

describe('getNotes', function() {
    it('should retrieve whatever is in the notes db', function(done) {
        let res = {
            json: function(notes) {
                var isSameUsername = (notes[0].username === testUser);
                var isSameNote = (notes[0].note === testNote);
                assert(isSameUsername && isSameNote);
                done();
            }
        };

        notesController.addNote(testUser, testNote).then(() => {
            notesController.getAllNotes(res);
        })
    })

    it('should retrieve the note that is tied to the username', function(done) {
        let req = { query: {username: testUser} };

        let res = {
            json: function(note) {
                var isSameUsername = (note.username === testUser);
                var isSameNote = (note.note === testNote);
                assert(isSameUsername && isSameNote);
                done();
            }
        };

        notesController.addNote(testUser, testNote).then(() => {
            notesController.getNoteByUsername(req, res);
        })
    })

})

describe('updateNote()', function() {

    let updateReq = { body: {
        username: testUser,
        note: testNote
    }};

    it('should update a note that already exists, based on a username', function(done) {
        let res = {
            send: function(result) {
                assert(result === 'succesfully saved');
                done();
            }
        }

        notesController.addNote(testUser, testNote).then(() => {
            notesController.updateNote(updateReq, res);
        })

    })
})

describe('deleteNote()', function() {

    let deleteReq = { body: {
        username: testUser,
        note: testNote
    }};

    it('should delete a note that exists, based on username', function(done) {
        let res = {
            status: function(res){
                assert(res === 200);
            },
            send: function(result) {
                assert(result === 'successfully deleted');
                done();
            }
        }
    
        notesController.addNote(testUser, testNote).then(() => {
            notesController.deleteNote(deleteReq, res);
        })
    })

    it('should return a 400 if trying to delete note not found', function(done) {
        let res = {
            status: function(res){
                assert(res === 400);
            },
            send: function(result) {
                assert(result === 'record not found');
                done();
            }
        }

        notesController.deleteNote(deleteReq, res);
    })
    
})