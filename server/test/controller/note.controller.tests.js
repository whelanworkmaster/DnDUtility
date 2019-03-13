var assert = require('assert');
var notesController = require('../../controller/note.controller');

let testUser = 'testUser';
let testNote = 'These are test notes, a user types these in the front end';

describe('addNotes', function() {

    it('should succesfully save the notes document to the db', function(done) {
        let note = notesController.addNote(testUser, testNote)
        note.then(() => {
            assert(!note.isNew);
            done();
        })
    })

})

describe('getNotes()', function() {

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
    
})