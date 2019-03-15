const Note = require('../model/note.model.js');

module.exports.addNote = function(user, newNote) {
    const note = new Note({
        username: user,
        note: newNote
    });
    
    return note.save();
}

module.exports.addNoteReq = function(req, res) {
    let username = req.body.username;
    let note = req.body.note;

    var self = this;  

    Note.findOne({"username" : username}, function(err, noteFound) {
        if(err) {
            res.status(400)
            return res.send('Error adding note')
        } else if(noteFound == null) {
            self.addNote(username, note) 
            return res.send("New note added");
        } else {
            res.status(400)
            return res.send("Failed adding note");
        }
    })
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

module.exports.getNoteByUsername = function(req, res) {
    let username = req.query.username;

    Note.findOne({"username" : username}, function(err, note) {
        if(note != null) {
            return res.json(note);
        } else {
            res.status(400);
            return res.send('Note not found');
        }
    })
}

module.exports.updateNote = function(req, res) {
    let query = { username: req.body.username };
    let newNote = { username: req.body.username, note: req.body.note };

    Note.findOneAndUpdate(query, newNote, {upsert:true}, function(err, doc){
        if (err) return res.send(500, { error: err });
        return res.send("succesfully saved");
    });
}