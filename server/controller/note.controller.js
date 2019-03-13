const Note = require('../model/note.model.js');

module.exports.addNote = function(user, newNote) {
    const note = new Note({
        username: user,
        note: newNote
    });
    
    return note.save();
}

module.exports.getAllNotes = function(res) {
    Note.find(function(err, notes) {
        if(err) {
            console.log(err);
        } else {
            res.json(notes);
        }
    })
}